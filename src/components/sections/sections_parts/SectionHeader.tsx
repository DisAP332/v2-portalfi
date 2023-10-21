interface IProps {
  location: string;
}

export function EventHeader() {
  return (
    <div className="sectionHeader eventsGrid">
      <h1 className="text-center">Date</h1>
      <h1>Name</h1>
      <h1 className="text-center">Ticket</h1>
      <h1 className="text-center">FAQ</h1>
      <h1 className="text-center">Img</h1>
      <h1 className="text-center">Actions</h1>
    </div>
  );
}

export function DrinkHeader() {
  return (
    <div className="sectionHeader drinksGrid">
      <h1 className="text-center">Name</h1>
      <h1>Cost</h1>
      <h1 className="text-center">Catagory</h1>
      <h1 className="text-center">Description</h1>
      <h1 className="text-center">Ingredients</h1>
      <h1 className="text-center">IsSpecial</h1>
      <h1 className="text-center">actions</h1>
    </div>
  );
}

export function FoodHeader() {
  return (
    <div className="sectionHeader foodGrid">
      <h1 className="text-center">Name</h1>
      <h1>Desc</h1>
      <h1 className="text-center">Cost</h1>
      <h1 className="text-center">Sale?</h1>
      <h1 className="text-center">Special?</h1>
      <h1 className="text-center">tags</h1>
      <h1>Ingrendients</h1>
      <h1>Type</h1>
      <h1 className="text-center">Actions</h1>
    </div>
  );
}
