import { ReactNode } from "react";

// One entry per form field. `type` picks the input widget; everything else
// is optional config that widget needs. Adding a field to a content type
// is adding one of these, not touching a component. `key` is tied to T so
// a typo'd field name is a compile error instead of a silently-blank input.
export type FormField<T> =
  | { key: keyof T & string; label: string; type: "text" | "textarea" | "number" | "date" | "time" }
  | { key: keyof T & string; label: string; type: "checkbox" }
  | { key: keyof T & string; label: string; type: "select"; options: { value: string; label: string }[] }
  | {
      key: keyof T & string;
      label: string;
      type: "checkboxGroup";
      // each sub-field is a boolean nested under `key`, e.g. Tags.Spicy
      options: { key: string; label: string }[];
    }
  | {
      key: keyof T & string;
      label: string;
      type: "toggleNumber";
      // nested under `key` as { [enabledKey]: boolean, [numberKey]: number },
      // e.g. Sale.Is / Sale.Percentage
      enabledKey: string;
      numberKey: string;
    };

// One entry per table/card column. `render` is the only place per-field
// display logic (percent signs, yes/no, truncation) lives - most columns
// need none and just show the raw value.
export interface ColumnDef<T> {
  key: keyof T & string;
  label: string;
  render?: (item: T) => ReactNode;
}

export interface ContentTypeConfig<T = any> {
  // used as the Redux key (contentData.<key>, sectionToggler.<key>), the
  // API path (/<key>), and the AddButton `location` prop.
  key: string;
  // singular display name, e.g. "Food", "Drink", "Event"
  label: string;
  // plural nav label, e.g. "Food", "Drinks", "Events"
  navLabel: string;
  initialValue: T;
  fields: FormField<T>[];
  columns: ColumnDef<T>[];
  // the field shown as each row's title in the tablet/mobile card views -
  // e.g. "Name" today, but a content type with no Name field can point
  // this at whatever field is its title without ContentRow needing to
  // know its concrete shape.
  titleKey: keyof T & string;
  // shown alongside titleKey in the tablet-width card view
  summaryKey: keyof T & string;
  // CSS grid-template-columns for the desktop table - one size per
  // column plus a trailing one for the Actions column. Lets each type
  // tune its own column widths without a matching CSS class to keep in
  // sync (the old foodGrid/drinksGrid/eventsGrid classes). Validated
  // against columns.length in content-types/index.tsx so a mismatch fails
  // loudly instead of silently misaligning the table.
  desktopGridColumns: string;
}
