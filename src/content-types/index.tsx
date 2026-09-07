import foodConfig from "./food";
import drinksConfig from "./drinks";
import eventsConfig from "./events";
import { ContentTypeConfig } from "./schema";

// The single list every generic piece (nav, sections, Redux slices) maps
// over. Adding a content type is adding one config file and one entry
// here - nothing else needs to change.
export const contentTypes: ContentTypeConfig[] = [
  eventsConfig,
  foodConfig,
  drinksConfig,
];

export { foodConfig, drinksConfig, eventsConfig };
export * from "./schema";
