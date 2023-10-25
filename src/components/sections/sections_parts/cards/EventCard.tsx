import { useEffect, useState } from "react";

function EventCard(Props: any) {
  // we use state in order to make sure that the server and client are aligned
  const [data, setData] = useState({
    date: "",
    time: "",
    name: "",
    cost: "",
    description: "",
    img: "",
  });

  useEffect(() => {
    function sliceDate() {
      if (Props.Date) {
        let date = Props.Date;
        date = date.slice(2, 10);
        return date;
      }
      return "";
    }
    setData({
      date: sliceDate(),
      time: Props.Time,
      name: Props.Name,
      cost: Props.Cost,
      description: Props.Description,
      img: Props.img,
    });
  }, [
    Props.Time,
    Props.Name,
    Props.Cost,
    Props.Description,
    Props.img,
    Props.Date,
  ]);

  return (
    <div id="card" className="eventsGrid text-slate-700">
      <div className="grid grid-cols-2">
        <h1>{data.date}</h1>
        <h1 className="ml-4">{data.time}</h1>
      </div>
      <div>
        <h1>{data.name}</h1>
      </div>
      <div>
        <h1>{data.cost + "$"}</h1>
      </div>
      <div>
        {data.description.length < 45 ? (
          <h1>{data.description}</h1>
        ) : (
          <h1
            className="cursor-pointer"
            onClick={() => window.alert(data.description)}
          >
            {data.description.slice(0, 45) + "..."}
          </h1>
        )}
        {/* {Props.Description ? (
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
        ) : null} */}
      </div>
      <div>
        {/* <h1>{Props.Img ? Props.Img : null}</h1> */}
        <h1>{data.img}</h1>
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
