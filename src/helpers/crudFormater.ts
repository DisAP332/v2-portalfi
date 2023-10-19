export default function format(requested: string, data: any) {
  class Event {
    Date: string;
    Name: string;
    Time: string;
    Description: string;
    Cost: string;
    constructor(
      Date: string,
      Name: string,
      Time: string,
      Description: string,
      Cost: string
    ) {
      this.Date = Date;
      this.Name = Name;
      this.Time = Time;
      this.Description = Description;
      this.Cost = Cost;
    }
  }

  class FoodItem {
    Name: string;
    Description: string;
    Cost: string;
    Sale: {
      Is: boolean;
      Percentage: number;
    };
    IsSpecial: boolean;
    Tags: {
      Spicy: boolean;
      Raw: boolean;
      Allergens: boolean;
    };
    Type: string;
    Ingredients: string;
    constructor(
      Name: string,
      Description: string,
      Cost: string,
      Sale: {
        Is: boolean;
        Percentage: number;
      },
      IsSpecial: boolean,
      Tags: {
        Spicy: boolean;
        Raw: boolean;
        Allergens: boolean;
      },
      Type: string,
      Ingredients: string
    ) {
      this.Name = Name;
      this.Description = Description;
      this.Cost = Cost;
      this.Sale = Sale;
      this.IsSpecial = IsSpecial;
      this.Tags = Tags;
      this.Type = Type;
      this.Ingredients = Ingredients;
    }
  }

  class Drink {
    Name: string;
    Cost: string;
    Category: string;
    Description: string;
    Ingredients: string;
    IsSpecial: boolean;
    constructor(
      Name: string,
      Cost: string,
      Category: string,
      Description: string,
      Ingredients: string,
      IsSpecial: boolean
    ) {
      this.Name = Name;
      this.Cost = Cost;
      this.Category = Category;
      this.Description = Description;
      this.Ingredients = Ingredients;
      this.IsSpecial = IsSpecial;
    }
  }

  switch (requested) {
    case "events":
      const event = new Event(
        data.date,
        data.name,
        data.time,
        data.description,
        data.cost
      );
      return event;
    case "food":
      const foodItem = new FoodItem(
        data.Name,
        data.Description,
        data.Cost,
        data.Sale,
        data.IsSpecial,
        data.Tags,
        data.Type,
        data.Ingredients
      );
      return foodItem;
    case "drinks":
      const drink = new Drink(
        data.name,
        data.cost,
        data.category,
        data.description,
        data.ingredients,
        data.isSpecial
      );
      return drink;
  }
}
