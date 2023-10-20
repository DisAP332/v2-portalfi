interface IProps {
  location: string;
}

const eventHeader = (
  <div className="sectionHeader eventsGrid">
    <h1 className="text-center">Date</h1>
    <h1>Name</h1>
    <h1 className="text-center">Ticket</h1>
    <h1 className="text-center">FAQ</h1>
    <h1 className="text-center">Img</h1>
    <h1 className="text-center">Actions</h1>
  </div>
);

const drinkHeader = (
  <div className="sectionHeader drinksGrid">
    <h1 className="text-center">Date</h1>
    <h1>Name</h1>
    <h1 className="text-center">Ticket</h1>
    <h1 className="text-center">FAQ</h1>
    <h1 className="text-center">Img</h1>
    <h1 className="text-center">Actions</h1>
  </div>
);

function SectionHeader(Props: IProps): JSX.Element {
  if (Props.location === "events") {
    return eventHeader;
  }
  if (Props.location === "drinks") {
    return drinkHeader;
  }
}

export default SectionHeader;
