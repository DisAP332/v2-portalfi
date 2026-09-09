import { AxiosResponse } from "axios";

// "user" and "siteData" are cache slots that aren't content types; every
// other key (any current or future entry in contentTypes) maps to
// `JBW<key>` automatically - no edit needed here to add a new content type.
const SPECIAL_KEYS: Record<string, string> = {
  user: "JBWuser",
  siteData: "siteData",
};

function storageKeyFor(requested: string): string {
  return SPECIAL_KEYS[requested] ?? `JBW${requested}`;
}

// localStorage.setItem coerces its value with String(), so writing the JS
// value `undefined` used to end up stored as the literal string
// "undefined" - which is truthy, JSON.parse's fine, and used to flow
// straight into Redux as bogus content-type data.
function safeParse(raw: string | null) {
  if (raw == null || raw === "undefined") return undefined;
  try {
    return JSON.parse(raw);
  } catch {
    return undefined;
  }
}

function getItem(requested: string) {
  if (typeof window === "undefined" || !window.localStorage) return undefined;
  return safeParse(localStorage.getItem(storageKeyFor(requested)));
}

function setItem(requested: string, payload: object) {
  if (payload === undefined) return;
  if (typeof window === "undefined" || !window.localStorage) return;
  localStorage.setItem(storageKeyFor(requested), JSON.stringify(payload));
}

// the auth token is an HttpOnly cookie set directly by the server - it was
// never something this helper should have been able to read or store in
// the first place, and now it genuinely can't.
function setItems(payload: AxiosResponse) {
  setItem("user", payload.data.response.user);
  setItem("events", payload.data.response.events);
  setItem("food", payload.data.response.food);
  setItem("drinks", payload.data.response.drinks);
  setItem("siteData", payload.data.response.publishedData);
}

const Storage = {
  getItem,
  setItem,
  setItems,
};

export default Storage;
