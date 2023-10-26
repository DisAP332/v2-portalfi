import { useEffect, useState } from "react";
import crudActions from "@/helpers/crudActions";
import { useDispatch } from "react-redux";
import { dataActions } from "@/redux/slices/contentDataSlice";
import EditEvent from "../../modals/edit/EditEvent";

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

  const dispatch = useDispatch();

  function handleDelete() {
    crudActions.Delete(Props._id, "events").then((res) => {
      dispatch(
        dataActions({
          requested: "events",
          data: res.data,
        })
      );
    });
  }

  const [showEditModal, setShowEditModal] = useState({
    show: false,
    css: { display: "none" },
  });

  const [eventData, setEventData] = useState({
    name: Props.Name,
    date: Props.Date,
    time: Props.Time,
    description: Props.Description,
    cost: Props.Cost,
  });

  const actions = {
    setShow: setShowEditModal,
    setEvents: Props.setEvents,
    setEvent: setEventData,
  };

  const propsData = {
    show: showEditModal,
    event: eventData,
    _id: Props._id,
  };

  const Buttons = (
    <div className="text-slate-100 ml-4">
      <button
        className="editBtn bg-slate-400"
        onClick={() =>
          setShowEditModal({ show: true, css: { display: "flex" } })
        }
      >
        Edit
      </button>
      <button className="deleteBtn bg-red-600" onClick={() => handleDelete()}>
        delete
      </button>
    </div>
  );

  const Card = Props.Description ? (
    <>
      {/* begin desktop */}

      <EditEvent actions={actions} data={propsData} />
      <div id="card" className="eventsGrid text-slate-700 hidden lg:grid">
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
        </div>
        <div>
          <h1>{data.img}</h1>
        </div>
        {Buttons}
      </div>
      {/* begin tablet */}

      <div className="hidden md:grid mdGrid lg:hidden" id="card">
        <div>
          <h1>
            {data.name.length < 15 ? data.name : data.name.slice(0, 14) + "..."}
          </h1>
        </div>
        <div>
          {data.description.length < 28 ? (
            <h1>{data.description}</h1>
          ) : (
            <h1
              className="cursor-pointer"
              onClick={() => window.alert(data.description)}
            >
              {data.description.slice(0, 28) + "..."}
            </h1>
          )}
        </div>
        {Buttons}
      </div>
      {/* begin mobile */}

      <div className="grid sm:hidden smGrid" id="card">
        <div>
          <h1>{data.name}</h1>
        </div>
        {Buttons}
      </div>
    </>
  ) : (
    <></>
  );

  return Card;
}

export default EventCard;
