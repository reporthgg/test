"use client";

import * as Select from "@radix-ui/react-select";
import { useRef, useState, type AriaAttributes, type ReactElement, type Ref } from "react";
import styles from "./LandingSelect.module.css";

export type LandingSelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type LandingSelectProps = {
  id?: string;
  name?: string;
  value: string;
  options: readonly LandingSelectOption[];
  onValueChange: (value: string) => void;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  ref?: Ref<HTMLButtonElement>;
} & Pick<AriaAttributes, "aria-label" | "aria-describedby" | "aria-invalid">;

export default function LandingSelect({
  id,
  name,
  value,
  options,
  onValueChange,
  placeholder,
  autoComplete,
  required,
  disabled,
  className,
  ref,
  ...aria
}: LandingSelectProps): ReactElement {
  const rootRef = useRef<HTMLDivElement>(null);
  const [portalHost, setPortalHost] = useState<HTMLDivElement | null>(null);
  const selectedLabel = options.find((option) => option.value === value)?.label;

  return (
    <div className={styles.root} ref={rootRef}>
      <Select.Root
        name={name}
        value={value}
        onValueChange={onValueChange}
        autoComplete={autoComplete}
        required={required}
        disabled={disabled}
        onOpenChange={(open) => {
          // Список остаётся внутри top layer родительского dialog.
          if (open) setPortalHost(rootRef.current);
        }}
      >
        <Select.Trigger
          {...aria}
          id={id}
          ref={ref}
          className={`${styles.trigger} ${className ?? ""}`}
          aria-required={required}
        >
          <Select.Value placeholder={placeholder}>{selectedLabel}</Select.Value>
          <Select.Icon className={styles.icon} aria-hidden="true">
            <span className={styles.chevron} />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal container={portalHost}>
          <Select.Content
            className={styles.content}
            aria-label={aria["aria-label"]}
            position="popper"
            align="start"
            sideOffset={8}
            collisionPadding={12}
            onEscapeKeyDown={(event) => event.stopPropagation()}
            onKeyDown={(event) => {
              if (event.key === "Escape") event.stopPropagation();
            }}
          >
            <Select.Viewport className={styles.viewport}>
              {options.map((option) => (
                <Select.Item
                  className={styles.item}
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  textValue={option.label}
                >
                  <Select.ItemText>{option.label}</Select.ItemText>
                  <Select.ItemIndicator className={styles.check} aria-hidden="true">
                    ✓
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}
