import { ContentTypeConfig } from "./schema";
import { truncated, dollars, yesNo } from "./renderHelpers";

export interface IFood {
  Name: string;
  Description: string;
  Cost: string;
  Sale: { Is: boolean; Percentage: number };
  IsSpecial: boolean;
  Tags: { Spicy: boolean; Raw: boolean; Allergens: boolean };
  Type: string;
  Ingredients: string;
}

const foodConfig: ContentTypeConfig<IFood> = {
  key: "food",
  label: "Food",
  navLabel: "Food",
  titleKey: "Name",
  summaryKey: "Description",
  desktopGridColumns: "0.8fr 1.2fr 0.4fr 0.5fr 0.5fr 0.5fr 1fr 0.5fr 1fr",
  initialValue: {
    Name: "",
    Description: "",
    Cost: "",
    Sale: { Is: false, Percentage: 0 },
    IsSpecial: false,
    Tags: { Spicy: false, Raw: false, Allergens: false },
    Type: "burger",
    Ingredients: "",
  },
  fields: [
    { key: "Name", label: "Name", type: "text" },
    { key: "Description", label: "Description", type: "textarea" },
    { key: "Cost", label: "Cost", type: "number" },
    {
      key: "Sale",
      label: "Sale",
      type: "toggleNumber",
      enabledKey: "Is",
      numberKey: "Percentage",
    },
    { key: "IsSpecial", label: "is Special?", type: "checkbox" },
    {
      key: "Tags",
      label: "tags",
      type: "checkboxGroup",
      options: [
        { key: "Spicy", label: "Spicy" },
        { key: "Raw", label: "Raw" },
        { key: "Allergens", label: "Alergens" },
      ],
    },
    {
      key: "Type",
      label: "Type",
      type: "select",
      options: [
        { value: "burger", label: "Entree" },
        { value: "side", label: "Side" },
      ],
    },
    { key: "Ingredients", label: "Ingredients", type: "textarea" },
  ],
  columns: [
    { key: "Name", label: "Name", render: (item) => <h1>{item.Name}</h1> },
    {
      key: "Description",
      label: "Desc",
      render: (item) => truncated(item.Description, 40),
    },
    { key: "Cost", label: "Cost", render: (item) => dollars(item.Cost) },
    {
      key: "Sale",
      label: "Sale?",
      render: (item) => (
        <h1>{item.Sale.Is ? `${item.Sale.Percentage}%` : "None"}</h1>
      ),
    },
    {
      key: "IsSpecial",
      label: "Special?",
      render: (item) => yesNo(item.IsSpecial),
    },
    {
      key: "Tags",
      label: "tags",
      render: (item) => (
        <h1>
          {item.Tags.Spicy ? "*Spicy" : ""}
          {item.Tags.Raw ? "*Raw" : ""}
          {item.Tags.Allergens ? "*Alergens" : ""}
        </h1>
      ),
    },
    {
      key: "Ingredients",
      label: "Ingrendients",
      render: (item) => truncated(item.Ingredients, 40),
    },
    { key: "Type", label: "Type", render: (item) => <h1>{item.Type}</h1> },
  ],
};

export default foodConfig;
