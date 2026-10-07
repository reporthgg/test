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
import SchoolTrialCard from "@/components/school/SchoolTrialCard";
import LandingSelect from "./LandingSelect";
import { formsContent } from "./forms-content";
import styles from "./LandingForms.module.css";
import schoolStyles from "@/components/school/SchoolTrial.module.css";

export type LeadKind = "diagnostic" | "trial";
export type LandingScope = "landing" | "school";
export type LeadSelection = { course?: string; teacher?: string };
type ActiveLead = { kind: LeadKind; selection?: LeadSelection };
type Field = "name" | "phone" | "city" | "consent";
type FieldErrors = Partial<Record<Field, string>>;
type FormValues = { name: string; phone: string; city: string; consent: boolean };
type SavedLead = { kind: LeadKind; crmDelivered: boolean };

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
const emptyValues: FormValues = { name: "", phone: "", city: "", consent: false };
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
        openLead(kind, { course, teacher });
      }}
    >
      {children}
    </button>
  );
}

function SuccessMessage({
  kind,
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
      <p>
        {crmDelivered
          ? kind === "trial" ? t.successTrial : t.successDiagnostic
          : t.savedDescription}
      </p>
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
  kind: LeadKind;
  source: string;
  appearance?: "standard" | "bottom" | "school";
  visible?: boolean;
  selection?: LeadSelection;
}): ReactElement {
  const { locale, scope, notifySaved } = useLandingContext();
  const t = formsContent[locale];
  const school = appearance === "school";
  const hasCity = kind === "diagnostic" || school;
  const cityRequired = kind === "diagnostic" && scope === "landing";
  const fieldClass = `${styles.field} ${school ? schoolStyles.field : ""}`;
  const id = useId();
  const [values, setValues] = useState<FormValues>(emptyValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<"invalid" | "request" | null>(null);
  const [sending, setSending] = useState(false);
  const [crmDelivered, setCrmDelivered] = useState<boolean | null>(null);
  const requestRef = useRef<AbortController | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLButtonElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const consentRef = useRef<HTMLInputElement>(null);
  const errorFocusRef = useRef<HTMLInputElement | HTMLButtonElement | null>(null);

  useEffect(() => () => requestRef.current?.abort(), []);

  useEffect(() => {
    if (sending || !visible) return;
    errorFocusRef.current?.focus();
    errorFocusRef.current = null;
  }, [errors, sending, visible]);

  function requestErrorFocus(nextErrors: FieldErrors): void {
    errorFocusRef.current = nextErrors.name ? nameRef.current
      : nextErrors.city ? cityRef.current
      : nextErrors.phone ? phoneRef.current
      : nextErrors.consent ? consentRef.current : null;
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
    if (
      hasCity && (cityRequired || values.city !== "") &&
      !t.cities.some((city) => city.value === values.city)
    ) {
      nextErrors.city = t.errors.city;
    }
    if (!values.consent) nextErrors.consent = t.errors.consent;
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setFormError("invalid");
      requestErrorFocus(nextErrors);
      return;
    }

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
          ...(hasCity && values.city ? { city: values.city } : {}),
          ...(selection?.course ? { course: selection.course } : {}),
          ...(selection?.teacher ? { teacher: selection.teacher } : {}),
          consent: true,
          source,
          leadKind: kind,
          locale,
        }),
      });
      const data: unknown = await response.json();
      if (request.signal.aborted) return;
      const record = typeof data === "object" && data !== null ? data : {};
      if (!response.ok || !("ok" in record) || record.ok !== true) {
        const details = "details" in record ? record.details : null;
        const serverErrors: FieldErrors = {};
        if (typeof details === "object" && details !== null) {
          for (const field of ["name", "phone", "city", "consent"] as const) {
            if (field in details) serverErrors[field] = t.errors[field];
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
      notifySaved({ kind, crmDelivered: delivered });
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
    return <SuccessMessage kind={kind} crmDelivered={crmDelivered} focus={visible} school={school} />;
  }

  const bottom = appearance === "bottom";
  const [beforeWhatsApp, afterWhatsApp] = t.whatsappPhone.split("WhatsApp");
  return (
    <form
      className={`${styles.fields} ${bottom ? styles.bottomFields : ""} ${school ? schoolStyles.fields : ""}`}
      onSubmit={handleSubmit}
      noValidate
      aria-busy={sending}
    >
      <fieldset className={styles.fieldset} disabled={sending}>
        <div className={`${hasCity ? styles.nameCity : styles.nameOnly} ${school ? schoolStyles.nameCity : ""}`}>
          <div className={fieldClass}>
            <label htmlFor={`${id}-name`}>{t.name}</label>
            <input
              ref={nameRef}
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
          {hasCity && (
            <div className={fieldClass}>
              <label htmlFor={`${id}-city`}>{cityRequired ? t.city : t.optionalCity}</label>
              <LandingSelect
                ref={cityRef}
                id={`${id}-city`}
                name="city"
                className={styles.selectControl}
                required={cityRequired}
                disabled={sending}
                autoComplete="address-level2"
                value={values.city}
                options={t.cities}
                placeholder={t.cityPlaceholder}
                aria-label={cityRequired ? t.city : t.optionalCity}
                aria-invalid={!!errors.city}
                aria-describedby={errors.city ? `${id}-city-error` : undefined}
                onValueChange={(city) => updateField("city", city)}
              />
              {errorFor("city")}
            </div>
          )}
        </div>
        <div className={fieldClass}>
          <label htmlFor={`${id}-phone`}>
            {bottom
              ? <>{beforeWhatsApp}<strong>WhatsApp</strong>{afterWhatsApp}</>
              : school ? (
                <>
                  <span className={schoolStyles.desktopText}>{t.phone}</span>
                  <span className={schoolStyles.mobileText}>{t.whatsappPhone}</span>
                </>
              ) : kind === "trial" ? t.whatsappPhone : t.phone}
          </label>
          <input
            ref={phoneRef}
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
        <div className={styles.consentField}>
          <label className={`${styles.consent} ${school ? schoolStyles.consent : ""}`} htmlFor={`${id}-consent`}>
            <span className={`${styles.checkbox} ${school ? schoolStyles.checkbox : ""}`}>
              <input
                ref={consentRef}
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
                  <img
                    src={values.consent
                      ? "/landing/forms/consent-checked.svg"
                      : "/landing/forms/consent-empty.svg"}
                    alt=""
                  />
                </span>
              )}
            </span>
            <span>{t.consent}</span>
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
        {school && !sending ? (
          <>
            <span className={schoolStyles.desktopText}>{t.schoolTrialSubmit}</span>
            <span className={schoolStyles.mobileText}>{t.trialSubmit}</span>
          </>
        ) : <span>{sending ? t.sending : kind === "trial" ? t.trialSubmit : t.submit}</span>}
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
  source,
}: {
  variant: "white" | "pink";
  source?: string;
}): ReactElement {
  const { locale, scope } = useLandingContext();
  const t = formsContent[locale];
  const titleId = useId();
  return (
    <section
      className={`${styles.leadCard} ${variant === "pink" ? styles.pink : styles.white}`}
      aria-labelledby={titleId}
    >
      <h2 id={titleId}>{t.diagnosticTitle}</h2>
      <p className={styles.description}>{t.diagnosticDescription}</p>
      <LeadFields kind="diagnostic" source={source ?? `${scope}-diagnostic-${variant}`} />
      <p className={styles.faster}>
        {t.faster}{" "}
        <a href={site.whatsapp.link} target="_blank" rel="noopener noreferrer">WhatsApp</a>
      </p>
    </section>
  );
}

export function TrialSection(): ReactElement {
  const { locale, scope } = useLandingContext();
  const t = formsContent[locale];
  const titleId = useId();
  return (
    <section id="trial" className={`${styles.trialSection} ${scope === "school" ? schoolStyles.bottomSection : ""}`} aria-labelledby={titleId}>
      <div className={`landing-container ${styles.trialContainer}`}>
        <header className={styles.trialHeading}>
          <p>{t.bottomDescription}</p>
          <h2 id={titleId} className="landing-title">
            {t.bottomTitle}<br /><em>{t.bottomTitleAccent}</em>
          </h2>
        </header>
        <div className={styles.bottomForm}>
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
        </SchoolTrialCard>
      </div>
    </section>
  );
}

export function LandingOverlays({ showWhatsapp = true }: { showWhatsapp?: boolean }): ReactElement {
  const { locale, scope, activeLead, leadSelection, closeLead, savedLead, dismissNotification } = useLandingContext();
  const t = formsContent[locale];
  const dialogRef = useRef<HTMLDialogElement>(null);
  const trialHeadingRef = useRef<HTMLHeadingElement>(null);
  const diagnosticHeadingRef = useRef<HTMLHeadingElement>(null);
  const backdropPress = useRef(false);
  const id = useId();
  const isOpen = activeLead !== null;
  const school = scope === "school";
  const schoolTrial = school && activeLead === "trial";

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !isOpen) return;
    if (!dialog.open) dialog.showModal();
    const heading = activeLead === "trial" ? trialHeadingRef : diagnosticHeadingRef;
    heading.current?.focus();
    return () => {
      if (dialog.open) dialog.close();
    };
  }, [isOpen, activeLead]);

  return (
    <>
      <dialog
        ref={dialogRef}
        className={`${styles.dialog} ${activeLead === "diagnostic" ? styles.diagnosticDialog : ""} ${schoolTrial ? schoolStyles.dialog : ""}`}
        aria-labelledby={`${id}-${activeLead ?? "trial"}-title`}
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
          {schoolTrial && (
            <SchoolTrialCard locale={locale} headingId={`${id}-trial-title`} headingRef={trialHeadingRef}>
              <LeadFields
                key={JSON.stringify(leadSelection ?? {})}
                kind="trial"
                source="school-trial-popup"
                appearance="school"
                selection={leadSelection}
              />
            </SchoolTrialCard>
          )}
          {!school && (
            <div className={styles.trialDialogContent} hidden={activeLead !== "trial"}>
              <div className={styles.offer}>
                <img className={styles.flags} src="/landing/forms/flags.svg" alt="" />
                <h2 id={`${id}-trial-title`} ref={trialHeadingRef} tabIndex={-1}>
                  {t.trialTitle}<br /><em>{t.trialTitleAccent}</em>
                </h2>
                <p>{t.trialDescription}</p>
                <ul>
                  {t.trialSteps.map((step) => (
                    <li key={step}><img src="/landing/forms/step-check.svg" alt="" /><span>{step}</span></li>
                  ))}
                </ul>
                <Image className={styles.offerSticker} src="/landing/forms/sticker-blue.png" alt="" width={153} height={153} sizes="153px" />
              </div>
              <div className={styles.trialFormPanel}>
                <div className={styles.price}>
                  <s>15 000 ₸</s>
                  <strong>0 ₸</strong>
                  <p>{t.trialPriceCaption}</p>
                </div>
                <LeadFields kind="trial" source={`${scope}-trial-popup`} visible={activeLead === "trial"} selection={leadSelection} />
              </div>
            </div>
          )}
          {(!school || activeLead === "diagnostic") && (
            <div className={`${styles.leadCard} ${styles.white} ${styles.diagnosticPanel}`} hidden={activeLead !== "diagnostic"}>
              <h2 id={`${id}-diagnostic-title`} ref={diagnosticHeadingRef} tabIndex={-1}>
                {t.diagnosticTitle}
              </h2>
              <p className={styles.description}>{t.diagnosticDescription}</p>
              <LeadFields kind="diagnostic" source={`${scope}-diagnostic-popup`} visible={activeLead === "diagnostic"} selection={leadSelection} />
              <p className={styles.faster}>
                {t.faster}{" "}
                <a href={site.whatsapp.link} target="_blank" rel="noopener noreferrer">WhatsApp</a>
              </p>
            </div>
          )}
          <button className={`${styles.close} ${schoolTrial ? schoolStyles.close : ""}`} type="button" onClick={closeLead} aria-label={t.close}>
            {schoolTrial && <img className={schoolStyles.desktopAsset} src="/landing/forms/school-close-desktop.svg" alt="" />}
            <img className={schoolTrial ? schoolStyles.mobileAsset : undefined} src="/landing/forms/close.svg" alt="" />
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
    </>
  );
}
