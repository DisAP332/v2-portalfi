import { ContentTypeConfig } from "./schema";
import { truncated, dollars, yesNo } from "./renderHelpers";

export interface IDrink {
  Name: string;
  Cost: string;
  Category: string;
  Description: string;
  Ingredients: string;
  IsSpecial: boolean;
}

const drinksConfig: ContentTypeConfig<IDrink> = {
  key: "drinks",
  label: "Drink",
  navLabel: "Drinks",
  summaryKey: "Description",
  desktopGridColumns: "1fr 0.5fr 1fr 1.6fr 1.6fr 0.5fr 1fr",
  initialValue: {
    Name: "",
    Cost: "",
    Category: "cocktail",
    Description: "",
    Ingredients: "",
    IsSpecial: false,
  },
  fields: [
    { key: "Name", label: "Name", type: "text" },
    { key: "Cost", label: "Cost", type: "number" },
    {
      key: "Category",
      label: "Category",
      type: "select",
      options: [
        { value: "cocktail", label: "Cocktail" },
        { value: "beer", label: "beer" },
        { value: "draft", label: "draft" },
        { value: "seltzer", label: "seltzer" },
      ],
    },
    { key: "Description", label: "Description", type: "textarea" },
    { key: "Ingredients", label: "Ingredients", type: "textarea" },
    { key: "IsSpecial", label: "Is Special?", type: "checkbox" },
  ],
  columns: [
    { key: "Name", label: "Name", render: (item) => <h1>{item.Name}</h1> },
    { key: "Cost", label: "Cost", render: (item) => dollars(item.Cost) },
    {
      key: "Category",
      label: "Catagory",
      render: (item) => <h1>{item.Category}</h1>,
    },
    {
      key: "Description",
      label: "Description",
      render: (item) => truncated(item.Description, 40),
    },
    {
      key: "Ingredients",
      label: "Ingredients",
      render: (item) => truncated(item.Ingredients, 40),
    },
    {
      key: "IsSpecial",
      label: "IsSpecial",
      render: (item) => yesNo(item.IsSpecial),
    },
  ],
};

export default drinksConfig;
