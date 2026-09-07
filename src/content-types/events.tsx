import { ContentTypeConfig } from "./schema";
import { truncated, dollars } from "./renderHelpers";

export interface IEvent {
  Date: string;
  Name: string;
  Time: string;
  Description: string;
  Cost: string;
}

// dates come back from the API as "YYYY-MM-DD"; slice(2, 10) drops the
// century for a shorter display, matching the original card's formatting.
function shortDate(date: string) {
  return date ? date.slice(2, 10) : "";
}

const eventsConfig: ContentTypeConfig<IEvent> = {
  key: "events",
  label: "Event",
  navLabel: "Events",
  summaryKey: "Description",
  desktopGridColumns: "0.7fr 0.6fr 1fr 0.5fr 2fr 1fr",
  initialValue: {
    Date: "",
    Name: "",
    Time: "",
    Description: "",
    Cost: "",
  },
  fields: [
    { key: "Date", label: "Date", type: "date" },
    { key: "Name", label: "Name", type: "text" },
    { key: "Time", label: "Time Opens", type: "time" },
    { key: "Description", label: "Description", type: "textarea" },
    { key: "Cost", label: "Door Cost", type: "number" },
  ],
  columns: [
    {
      key: "Date",
      label: "Date",
      render: (item) => <h1>{shortDate(item.Date)}</h1>,
    },
    { key: "Time", label: "Time", render: (item) => <h1>{item.Time}</h1> },
    { key: "Name", label: "Name", render: (item) => <h1>{item.Name}</h1> },
    { key: "Cost", label: "Cost", render: (item) => dollars(item.Cost) },
    {
      key: "Description",
      label: "Description",
      render: (item) => truncated(item.Description, 45),
    },
  ],
};

export default eventsConfig;
