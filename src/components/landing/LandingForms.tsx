"use client";

/* eslint-disable @next/next/no-img-element -- Keep the original Figma SVGs at their intrinsic dimensions. */

import Image from "next/image";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type ReactElement,
  type ReactNode,
} from "react";
import type { Locale } from "@/i18n/config";
import { site } from "@/lib/site";
import { leadTracking, rememberUtm } from "@/lib/lead-tracking";
import { trackMetaEvent } from "@/lib/meta-pixel";
import SchoolTrialCard from "@/components/school/SchoolTrialCard";
import ConsentText from "@/components/legal/ConsentText";
import CookieNotice from "@/components/legal/CookieNotice";
import LandingSelect, { type LandingSelectOption } from "./LandingSelect";
import { formsContent, type OfferPage } from "./forms-content";
import styles from "./LandingForms.module.css";
import schoolStyles from "@/components/school/SchoolTrial.module.css";

export type LeadKind = "diagnostic" | "trial";
// scope задаёт текст оффера в попапе и источник заявки в CRM; на camps вместо диагностики заявка на лагерь.
export type LandingScope = "landing" | "school" | "camps" | "abroad" | "exams" | "tests" | "about";
export type LeadSelection = { course?: string; teacher?: string; camp?: string };
type ActiveLead = { kind: LeadKind; selection?: LeadSelection };
// Консультация открывается только формой на первом экране, у неё нет своего попапа.
type FormKind = LeadKind | "consultation";
type SelectField = "city" | "branch" | "program" | "year" | "interest";
type Field = "name" | "phone" | SelectField | "consent";
type FieldErrors = Partial<Record<Field, string>>;
type FormValues = Record<Exclude<Field, "consent">, string> & { consent: boolean };
type SavedLead = { crmDelivered: boolean };

// Тексты оффера по страницам (ТЗ 2.2): у главной, школы, экзаменов и «За рубеж» свои, у остальных общий.
export function offerPage(scope: LandingScope): OfferPage {
  if (scope === "landing") return "home";
  return scope === "school" || scope === "exams" || scope === "abroad" ? scope : "default";
}

type LandingContextValue = {
  locale: Locale;
  scope: LandingScope;
  activeLead: LeadKind | null;
  leadSelection?: LeadSelection;
  openLead: (kind: LeadKind, selection?: LeadSelection) => void;
  closeLead: () => void;
  savedLead: SavedLead | null;
  notifySaved: (lead: SavedLead) => void;
  dismissNotification: () => void;
};

const LandingContext = createContext<LandingContextValue | null>(null);
const emptyValues: FormValues = {
  name: "", phone: "", city: "", branch: "", program: "", year: "", interest: "", consent: false,
};
const controlCharacters = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/u;

export function LandingProvider({
  locale,
  scope = "landing",
  children,
}: {
  locale: Locale;
  scope?: LandingScope;
  children: ReactNode;
}): ReactElement {
  const [activeLead, setActiveLead] = useState<ActiveLead | null>(null);
  const [savedLead, setSavedLead] = useState<SavedLead | null>(null);
  const openLead = useCallback((kind: LeadKind, selection?: LeadSelection) => {
    setActiveLead({ kind, selection });
  }, []);
  const closeLead = useCallback(() => setActiveLead(null), []);
  const dismissNotification = useCallback(() => setSavedLead(null), []);

  useEffect(() => rememberUtm(), []);

  return (
    <LandingContext.Provider
      value={{
        locale,
        scope,
        activeLead: activeLead?.kind ?? null,
        leadSelection: activeLead?.selection,
        openLead,
        closeLead,
        savedLead,
        notifySaved: setSavedLead,
        dismissNotification,
      }}
    >
      {children}
    </LandingContext.Provider>
  );
}

function useLandingContext(): LandingContextValue {
  const context = useContext(LandingContext);
  if (!context) throw new Error("Landing components require LandingProvider");
  return context;
}

export function useLandingActions(): Pick<LandingContextValue, "openLead" | "scope"> {
  const { openLead, scope } = useLandingContext();
  return { openLead, scope };
}

export function LeadButton({
  kind = "diagnostic",
  className,
  course,
  teacher,
  camp,
  children,
}: {
  kind?: LeadKind;
  className?: string;
  children: ReactNode;
} & LeadSelection): ReactElement {
  const { openLead } = useLandingActions();
  const buttonRef = useRef<HTMLButtonElement>(null);
  return (
    <button
      ref={buttonRef}
      type="button"
      className={className ?? "landing-button"}
      aria-haspopup="dialog"
      onClick={() => {
        buttonRef.current?.focus();
        openLead(kind, { course, teacher, camp });
      }}
    >
      {children}
    </button>
  );
}

function SuccessMessage({
  crmDelivered,
  focus = false,
  school = false,
}: SavedLead & { focus?: boolean; school?: boolean }): ReactElement {
  const { locale } = useLandingContext();
  const t = formsContent[locale];
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (focus) successRef.current?.focus();
  }, [focus]);

  return (
    <div className={`${styles.success} ${school ? schoolStyles.success : ""}`} ref={successRef} tabIndex={-1}>
      {school && <img className={schoolStyles.desktopAsset} src="/landing/forms/school-success-desktop.svg" alt="" />}
      <img className={school ? schoolStyles.mobileAsset : undefined} src="/landing/forms/success-check.svg" alt="" />
      <h3>{crmDelivered ? t.successTitle : t.savedTitle}</h3>
      <p>{crmDelivered ? t.successText : t.savedDescription}</p>
      {!crmDelivered && (
        <a href={site.whatsapp.link} target="_blank" rel="noopener noreferrer">
          {t.whatsapp}
        </a>
      )}
    </div>
  );
}

function LeadFields({
  kind,
  source,
  appearance = "standard",
  visible = true,
  selection,
}: {
  kind: FormKind;
  source: string;
  appearance?: "standard" | "bottom" | "school";
  visible?: boolean;
  selection?: LeadSelection;
}): ReactElement {
  const { locale, scope, notifySaved } = useLandingContext();
  const t = formsContent[locale];
  const school = appearance === "school";
  const consultation = kind === "consultation";
  const camps = scope === "camps";
  // Форма оффера (ТЗ 2.1): имя, телефон, обязательный город и необязательное «Что интересует».
  // В заявке на лагерь продукт известен, поэтому там только имя, город и телефон.
  const offerForm = !consultation && !camps;
  const fieldClass = `${styles.field} ${school ? schoolStyles.field : ""}`;
  const rowClass = `${styles.nameCity} ${school ? schoolStyles.nameCity : ""}`;
  // Порядок полей на экране: по нему фокус переходит к первой ошибке.
  const fieldOrder: readonly Field[] = consultation
    ? ["name", "phone", "branch", "program", "year", "consent"]
    : offerForm ? ["name", "phone", "city", "interest", "consent"] : ["name", "city", "phone", "consent"];
  const selectOptions: Record<SelectField, readonly LandingSelectOption[]> = {
    city: t.cities,
    branch: t.branches,
    program: t.services,
    year: t.admissionYears,
    interest: t.interests,
  };
  const submitLabel = consultation ? t.consultationSubmit : camps ? t.campsSubmit : t.offers[offerPage(scope)].submit;
  const id = useId();
  const [values, setValues] = useState<FormValues>(emptyValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<"invalid" | "request" | null>(null);
  const [sending, setSending] = useState(false);
  const [crmDelivered, setCrmDelivered] = useState<boolean | null>(null);
  const requestRef = useRef<AbortController | null>(null);
  const fieldRefs = useRef<Partial<Record<Field, HTMLInputElement | HTMLButtonElement | null>>>({});
  const errorFocusRef = useRef<HTMLInputElement | HTMLButtonElement | null>(null);

  useEffect(() => () => requestRef.current?.abort(), []);

  useEffect(() => {
    if (sending || !visible) return;
    errorFocusRef.current?.focus();
    errorFocusRef.current = null;
  }, [errors, sending, visible]);

  function requestErrorFocus(nextErrors: FieldErrors): void {
    const field = fieldOrder.find((item) => nextErrors[item]);
    errorFocusRef.current = field ? fieldRefs.current[field] ?? null : null;
  }

  function errorText(field: Field): string {
    return field === "branch" || field === "program" || field === "year" || field === "interest"
      ? t.errors.option : t.errors[field];
  }

  function updateField<K extends Field>(field: K, value: FormValues[K]): void {
    setValues((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({ ...previous, [field]: undefined }));
    setFormError(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    if (requestRef.current || crmDelivered !== null) return;

    const nextErrors: FieldErrors = {};
    const name = values.name.trim();
    const phone = values.phone.trim();
    const digits = phone.replace(/\D/gu, "");
    if (!name || values.name.length > 200 || controlCharacters.test(values.name)) {
      nextErrors.name = t.errors.name;
    }
    if (
      values.phone.length > 60 || controlCharacters.test(values.phone) ||
      !/^\+?[\d\s().-]+$/u.test(phone) ||
      digits.length < 5 || digits.length > 20
    ) {
      nextErrors.phone = t.errors.phone;
    }
    for (const field of ["city", "branch", "program", "year", "interest"] as const) {
      const required = field === "city";
      if (
        fieldOrder.includes(field) && (required || values[field] !== "") &&
        !selectOptions[field].some((option) => option.value === values[field])
      ) {
        nextErrors[field] = errorText(field);
      }
    }
    if (!values.consent) nextErrors.consent = t.errors.consent;
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setFormError("invalid");
      requestErrorFocus(nextErrors);
      return;
    }

    // Филиал уходит отдельным полем, а его город заполняет колонку city, как в других формах.
    const branch = consultation ? t.branches.find((option) => option.value === values.branch) : undefined;
    const request = new AbortController();
    requestRef.current = request;
    setSending(true);
    setFormError(null);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: request.signal,
        body: JSON.stringify({
          name,
          phone,
          ...(!consultation && values.city ? { city: values.city } : {}),
          ...(branch ? { city: branch.city, branch: branch.value } : {}),
          ...(offerForm && values.interest ? { interest: values.interest } : {}),
          ...(consultation && values.program ? { program: values.program } : {}),
          ...(consultation && values.year ? { year: values.year } : {}),
          ...(selection?.course ? { course: selection.course } : {}),
          ...(selection?.teacher ? { teacher: selection.teacher } : {}),
          ...(selection?.camp ? { camp: selection.camp } : {}),
          consent: true,
          source,
          leadKind: kind,
          locale,
          ...leadTracking(),
        }),
      });
      const data: unknown = await response.json();
      if (request.signal.aborted) return;
      const record = typeof data === "object" && data !== null ? data : {};
      if (!response.ok || !("ok" in record) || record.ok !== true) {
        const details = "details" in record ? record.details : null;
        const serverErrors: FieldErrors = {};
        if (typeof details === "object" && details !== null) {
          for (const field of fieldOrder) {
            if (field in details) serverErrors[field] = errorText(field);
          }
        }
        setErrors(serverErrors);
        setFormError(Object.keys(serverErrors).length ? "invalid" : "request");
        requestErrorFocus(serverErrors);
        return;
      }
      const delivered = "crmDelivered" in record && record.crmDelivered === true;
      setCrmDelivered(delivered);
      setValues(emptyValues);
      notifySaved({ crmDelivered: delivered });
      trackMetaEvent("Lead");
    } catch {
      if (!request.signal.aborted) setFormError("request");
    } finally {
      if (requestRef.current === request) requestRef.current = null;
      if (!request.signal.aborted) setSending(false);
    }
  }

  function errorFor(field: Field): ReactNode {
    return errors[field] ? (
      <p className={styles.fieldError} id={`${id}-${field}-error`}>
        {errors[field]}
      </p>
    ) : null;
  }

  if (crmDelivered !== null) {
    return <SuccessMessage crmDelivered={crmDelivered} focus={visible} school={school} />;
  }

  const bottom = appearance === "bottom";
  const [beforeWhatsApp, afterWhatsApp] = t.whatsappPhone.split("WhatsApp");

  function selectField(field: SelectField, label: string, required = false): ReactElement {
    return (
      <div className={fieldClass}>
        <label htmlFor={`${id}-${field}`}>{bottom ? `${label}:` : label}</label>
        <LandingSelect
          ref={(node) => { fieldRefs.current[field] = node; }}
          id={`${id}-${field}`}
          name={field}
          className={styles.selectControl}
          required={required}
          disabled={sending}
          autoComplete={field === "city" ? "address-level2" : undefined}
          value={values[field]}
          options={selectOptions[field]}
          placeholder={t.selectPlaceholder}
          aria-label={label}
          aria-invalid={!!errors[field]}
          aria-describedby={errors[field] ? `${id}-${field}-error` : undefined}
          onValueChange={(value) => updateField(field, value)}
        />
        {errorFor(field)}
      </div>
    );
  }

  const nameField = (
    <div className={fieldClass}>
      <label htmlFor={`${id}-name`}>{bottom ? `${t.name}:` : t.name}</label>
      <input
        ref={(node) => { fieldRefs.current.name = node; }}
        id={`${id}-name`}
        name="name"
        type="text"
        autoComplete="name"
        placeholder={t.namePlaceholder}
        required
        maxLength={200}
        value={values.name}
        aria-invalid={!!errors.name}
        aria-describedby={errors.name ? `${id}-name-error` : undefined}
        onChange={(event) => updateField("name", event.target.value)}
      />
      {errorFor("name")}
    </div>
  );

  const phoneField = (
    <div className={fieldClass}>
      <label htmlFor={`${id}-phone`}>
        {bottom ? (
          <>
            {beforeWhatsApp}
            <strong>WhatsApp{afterWhatsApp ? null : <span>:</span>}</strong>
            {afterWhatsApp && `${afterWhatsApp}:`}
          </>
        ) : school ? (
          <>
            <span className={schoolStyles.desktopText}>{t.phone}</span>
            <span className={schoolStyles.mobileText}>{t.whatsappPhone}</span>
          </>
        ) : t.phone}
      </label>
      <input
        ref={(node) => { fieldRefs.current.phone = node; }}
        id={`${id}-phone`}
        name="phone"
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        placeholder="+7 (___) ___-__-__"
        required
        maxLength={60}
        value={values.phone}
        aria-invalid={!!errors.phone}
        aria-describedby={errors.phone ? `${id}-phone-error` : undefined}
        onChange={(event) => updateField("phone", event.target.value)}
      />
      {errorFor("phone")}
    </div>
  );

  return (
    <form
      className={`${styles.fields} ${bottom ? styles.bottomFields : ""} ${school ? schoolStyles.fields : ""}`}
      onSubmit={handleSubmit}
      noValidate
      aria-busy={sending}
    >
      <fieldset className={styles.fieldset} disabled={sending}>
        {consultation ? (
          <>
            <div className={styles.nameCity}>
              {nameField}
              {phoneField}
            </div>
            <div className={styles.nameCity}>
              {selectField("branch", t.branch)}
              {selectField("program", t.service)}
            </div>
            {selectField("year", t.admissionYear)}
          </>
        ) : offerForm ? (
          <>
            <div className={`${rowClass} ${styles.offerRow}`}>
              {nameField}
              {phoneField}
            </div>
            <div className={`${rowClass} ${styles.offerRow}`}>
              {selectField("city", t.city, true)}
              {selectField("interest", t.interest)}
            </div>
          </>
        ) : (
          <>
            <div className={rowClass}>
              {nameField}
              {selectField("city", t.city, true)}
            </div>
            {phoneField}
          </>
        )}
        <div className={styles.consentField}>
          <label className={`${styles.consent} ${school ? schoolStyles.consent : ""}`} htmlFor={`${id}-consent`}>
            <span className={`${styles.checkbox} ${school ? schoolStyles.checkbox : ""}`}>
              <input
                ref={(node) => { fieldRefs.current.consent = node; }}
                id={`${id}-consent`}
                name="consent"
                type="checkbox"
                required
                checked={values.consent}
                aria-invalid={!!errors.consent}
                aria-describedby={errors.consent ? `${id}-consent-error` : undefined}
                onChange={(event) => updateField("consent", event.target.checked)}
              />
              {bottom && (
                <span className={styles.checkboxArtwork} aria-hidden="true">
                  {/* Figma: на десктопе квадрат 16 px, на мобильной 24 px, в обоих состояниях. */}
                  <picture key={String(values.consent)}>
                    <source
                      media="(max-width: 767px)"
                      srcSet={values.consent
                        ? "/landing/forms/consent-checked-mobile.svg"
                        : "/landing/forms/consent-empty.svg"}
                    />
                    <img
                      src={values.consent
                        ? "/landing/forms/consent-checked.svg"
                        : "/landing/forms/consent-empty-desktop.svg"}
                      alt=""
                    />
                  </picture>
                </span>
              )}
            </span>
            <ConsentText locale={locale} className={styles.consentText} />
          </label>
          {errorFor("consent")}
        </div>
      </fieldset>
      {formError && (
        <p className={styles.formError} role="alert">
          {formError === "invalid" ? t.invalidForm : t.error}
        </p>
      )}
      <button
        className={bottom ? styles.roundSubmit : styles.submit}
        type="submit"
        disabled={sending}
      >
        <span>{sending ? t.sending : submitLabel}</span>
        {bottom && (
          <>
            <img className={styles.arrowDesktop} src="/landing/forms/arrow-desktop.svg" alt="" />
            <img className={styles.arrowMobile} src="/landing/forms/arrow-mobile.svg" alt="" />
          </>
        )}
      </button>
    </form>
  );
}

export function LandingLeadForm({
  variant,
  kind = "diagnostic",
  source,
}: {
  variant: "white" | "pink";
  kind?: "diagnostic" | "consultation";
  source?: string;
}): ReactElement {
  const { locale, scope } = useLandingContext();
  const t = formsContent[locale];
  const offer = t.offers[offerPage(scope)];
  const titleId = useId();
  const consultation = kind === "consultation";
  return (
    <section
      className={`${styles.leadCard} ${variant === "pink" ? styles.pink : styles.white} ${consultation ? styles.consultation : ""}`}
      aria-labelledby={titleId}
    >
      <h2 id={titleId}>{consultation ? t.consultationTitle : offer.title.join(" ")}</h2>
      <p className={styles.description}>{consultation ? t.consultationDescription : offer.description}</p>
      <LeadFields kind={kind} source={source ?? `${scope}-${kind}-${variant}`} />
      <FasterWhatsApp />
    </section>
  );
}

function FasterWhatsApp(): ReactElement {
  const { locale } = useLandingContext();
  return (
    <p className={styles.faster}>
      {formsContent[locale].faster}{" "}
      <a href={site.whatsapp.link} target="_blank" rel="noopener noreferrer">WhatsApp</a>
    </p>
  );
}

export function TrialSection(): ReactElement {
  const { locale, scope } = useLandingContext();
  const offer = formsContent[locale].offers[offerPage(scope)];
  const titleId = useId();
  return (
    <section id="trial" className={`${styles.trialSection} ${scope === "school" ? schoolStyles.bottomSection : ""}`} aria-labelledby={titleId}>
      <div className={`landing-container ${styles.trialContainer}`}>
        <header className={styles.trialHeading}>
          <p>{offer.description}</p>
          <h2 id={titleId} className="landing-title">
            {offer.title[0]}{" "}<br /><em>{offer.title[1]}</em>
          </h2>
        </header>
        <div className={`${styles.bottomForm} ${scope !== "school" ? styles.homeBottomForm : ""}`}>
          <div className={styles.formBackground} aria-hidden="true">
            <img className={styles.backgroundDesktop} src="/landing/forms/form-desktop.svg" alt="" />
            <img className={styles.backgroundMobile} src="/landing/forms/form-mobile.svg" alt="" />
          </div>
          <LeadFields kind="trial" source={`${scope}-trial-bottom`} appearance="bottom" />
        </div>
      </div>
      <div className={styles.stickers} aria-hidden="true">
        <Image className={`${styles.stickerYellow} ${schoolStyles.bottomYellow}`} src="/landing/forms/sticker-yellow.png" alt="" width={400} height={266} sizes="(max-width: 767px) 160px, 400px" />
        <Image className={styles.stickerBlue} src="/landing/forms/sticker-blue.png" alt="" width={245} height={245} sizes="245px" />
        <Image className={`${styles.stickerPink} ${schoolStyles.bottomPink}`} src="/landing/forms/sticker-pink.png" alt="" width={230} height={230} sizes="(max-width: 767px) 120px, 230px" />
        <Image className={`${styles.stickerRibbon} ${schoolStyles.bottomRibbon}`} src="/landing/forms/sticker-ribbon.png" alt="" width={415} height={276} sizes="(max-width: 767px) 145px, 415px" />
      </div>
    </section>
  );
}

export function SchoolTrialSection(): ReactElement {
  const { locale, scope } = useLandingContext();
  const titleId = useId();
  return (
    <section id="school-trial" className={schoolStyles.section} aria-labelledby={titleId}>
      <div className="landing-container">
        <SchoolTrialCard locale={locale} headingId={titleId}>
          <LeadFields kind="trial" source={`${scope}-trial-inline`} appearance="school" />
          <FasterWhatsApp />
        </SchoolTrialCard>
      </div>
    </section>
  );
}

export function LandingOverlays({ showWhatsapp = true }: { showWhatsapp?: boolean }): ReactElement {
  const { locale, scope, activeLead, leadSelection, closeLead, savedLead, dismissNotification } = useLandingContext();
  const t = formsContent[locale];
  const offer = t.offers[offerPage(scope)];
  const dialogRef = useRef<HTMLDialogElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const backdropPress = useRef(false);
  const id = useId();
  const isOpen = activeLead !== null;
  const kind = activeLead ?? "diagnostic";
  const school = scope === "school";
  // На /camps диагностики нет (ТЗ 2.2): там попап с заявкой на лагерь.
  const camps = scope === "camps";
  const schoolPopup = school && isOpen;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !isOpen) return;
    if (!dialog.open) dialog.showModal();
    headingRef.current?.focus();
    return () => {
      if (dialog.open) dialog.close();
    };
  }, [isOpen, activeLead]);

  return (
    <>
      <dialog
        ref={dialogRef}
        className={`${styles.dialog} ${camps ? styles.diagnosticDialog : ""} ${school ? schoolStyles.dialog : ""}`}
        aria-labelledby={`${id}-title`}
        onCancel={(event) => {
          event.preventDefault();
          closeLead();
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            closeLead();
          }
        }}
        onClose={closeLead}
        onPointerDown={(event) => {
          const bounds = dialogRef.current?.getBoundingClientRect();
          backdropPress.current = event.target === event.currentTarget && !!bounds && (
            event.clientX < bounds.left || event.clientX > bounds.right ||
            event.clientY < bounds.top || event.clientY > bounds.bottom
          );
        }}
        onClick={(event) => {
          if (backdropPress.current && event.target === event.currentTarget) closeLead();
          backdropPress.current = false;
        }}
      >
        <div className={styles.dialogContent}>
          {schoolPopup && (
            <SchoolTrialCard locale={locale} headingId={`${id}-title`} headingRef={headingRef}>
              <LeadFields
                key={JSON.stringify(leadSelection ?? {})}
                kind={kind}
                source={`school-${kind}-popup`}
                appearance="school"
                selection={leadSelection}
              />
              <FasterWhatsApp />
            </SchoolTrialCard>
          )}
          {!school && !camps && (
            <div className={styles.trialDialogContent} hidden={!isOpen}>
              <div className={styles.offer}>
                <img className={styles.flags} src="/landing/forms/flags.svg" alt="" />
                <p className={styles.badge}>{t.offerBadge}</p>
                <h2 id={`${id}-title`} ref={headingRef} tabIndex={-1}>
                  {offer.title.join(" ")}
                </h2>
                <p>{offer.description}</p>
                <ul>
                  {t.offerSteps.map((step) => (
                    <li key={step}><img src="/landing/forms/step-check.svg" alt="" /><span>{step}</span></li>
                  ))}
                </ul>
                <Image className={styles.offerSticker} src="/landing/forms/sticker-blue.png" alt="" width={153} height={153} sizes="153px" />
              </div>
              <div className={styles.trialFormPanel}>
                <LeadFields kind={kind} source={`${scope}-${kind}-popup`} visible={isOpen} selection={leadSelection} />
                <FasterWhatsApp />
              </div>
            </div>
          )}
          {camps && (
            <div className={`${styles.leadCard} ${styles.white} ${styles.diagnosticPanel}`} hidden={!isOpen}>
              <h2 id={`${id}-title`} ref={headingRef} tabIndex={-1}>{t.campsTitle}</h2>
              <p className={styles.description}>{t.campsDescription}</p>
              <LeadFields kind={kind} source={`camps-${kind}-popup`} visible={isOpen} selection={leadSelection} />
              <FasterWhatsApp />
            </div>
          )}
          <button className={`${styles.close} ${school ? schoolStyles.close : ""}`} type="button" onClick={closeLead} aria-label={t.close}>
            {school && <img className={schoolStyles.desktopAsset} src="/landing/forms/school-close-desktop.svg" alt="" />}
            <img className={school ? schoolStyles.mobileAsset : undefined} src="/landing/forms/close.svg" alt="" />
          </button>
        </div>
      </dialog>
      <div className={styles.notificationRegion} role="status" aria-live="polite" aria-atomic="true">
        {savedLead && !isOpen && (
          <div className={styles.toast}>
            <SuccessMessage {...savedLead} />
            <button className={styles.toastClose} type="button" onClick={dismissNotification} aria-label={t.close}>
              <img src="/landing/forms/close.svg" alt="" />
            </button>
          </div>
        )}
      </div>
      {showWhatsapp && (
        <a className={styles.whatsappWidget} href={site.whatsapp.link} target="_blank" rel="noopener noreferrer" aria-label={t.whatsapp}>
          <img src="/landing/forms/whatsapp.svg" alt="" />
        </a>
      )}
      <CookieNotice locale={locale} />
    </>
  );
}
