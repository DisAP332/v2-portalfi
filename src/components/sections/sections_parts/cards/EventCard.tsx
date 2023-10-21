import { useEffect, useState } from "react";

function EventCard(Props: any) {
  const [date, setDate] = useState("");

  useEffect(() => {
    function sliceDate() {
      if (Props.Date) {
        let date = Props.Date;
        date = date.slice(2, 10);
        return date;
      }
      return "";
    }
    setDate(sliceDate());
  }, [Props.Date]);

  return (
    <div id="card" className="eventsGrid text-slate-700">
      <div className="grid grid-cols-2">
        <h1>{date}</h1>
        <h1 className="ml-4">{Props.Time ? Props.Time : null}</h1>
      </div>
      <div>
        <h1>{Props.Name ? Props.Name : null}</h1>
      </div>
      <div>
        <h1>{Props.Cost ? Props.Cost + "$" : null}</h1>
      </div>
      <div>
        {Props.Description ? (
          Props.Description.length < 45 ? (
            <h1>{Props.Description}</h1>
          ) : (
            <h1
              className="cursor-pointer"
              onClick={() => window.alert(Props.Description)}
            >
              {Props.Description.slice(0, 45) + "..."}
            </h1>
          )
        ) : null}
      </div>
      <div>
        <h1>{Props.Img ? Props.Img : null}</h1>
      </div>
      <div className="text-slate-100 ml-4">
        <button
          className="editBtn bg-slate-400"
          // onClick={() =>
          //   setShowEditModal({ show: true, css: { display: "flex" } })
          // }
        >
          Edit
        </button>
        <button
          className="deleteBtn bg-red-600"
          // onClick={() => handleDelete()}
        >
          delete
        </button>
      </div>
    </div>
  );
}

export default EventCard;
