interface IProps {
  location: string;
}

const EventHeader = (
  <div className="sectionHeader eventsGrid">
    <h1 className="text-center">Date</h1>
    <h1>Name</h1>
    <h1 className="text-center">Ticket</h1>
    <h1 className="text-center">FAQ</h1>
    <h1 className="text-center">Img</h1>
    <h1 className="text-center">Actions</h1>
  </div>
);

const DrinkHeader = (
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

function SectionHeader(Props: IProps): JSX.Element {
  if (Props.location === "events") {
    return EventHeader;
  }
  if (Props.location === "drinks") {
    return DrinkHeader;
  }
}

export default SectionHeader;
