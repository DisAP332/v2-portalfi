import foodConfig from "./food";
import drinksConfig from "./drinks";
import eventsConfig from "./events";
import { ContentTypeConfig } from "./schema";

// desktopGridColumns is a hand-typed grid-template-columns string (one
// token per column, plus one for the trailing Actions column) - nothing
// about its type ties its token count to columns.length, so a config
// edited on one side without the other would silently misalign the
// desktop table. Failing fast at load time turns that into an obvious
// error instead.
export function assertGridColumnsMatch(config: ContentTypeConfig) {
  const tokenCount = config.desktopGridColumns.trim().split(/\s+/).length;
  const expected = config.columns.length + 1;
  if (tokenCount !== expected) {
    throw new Error(
      `${config.key}: desktopGridColumns has ${tokenCount} column(s), but columns (${config.columns.length}) + Actions needs ${expected}`
    );
  }
}

// The single list every generic piece (nav, sections, Redux slices) maps
// over. Adding a content type is adding one config file and one entry
// here - nothing else needs to change.
export const contentTypes: ContentTypeConfig[] = [
  eventsConfig,
  foodConfig,
  drinksConfig,
];

contentTypes.forEach(assertGridColumnsMatch);

export { foodConfig, drinksConfig, eventsConfig };
export * from "./schema";
