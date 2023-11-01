import { dataActions } from "@/redux/slices/contentDataSlice";
import crudActions from "@/helpers/crudActions";
import { useState } from "react";
import { useDispatch } from "react-redux";

interface propsTypes {
  actions: {
    setShow: Function;
    setEvent: Function;
    setEvents: Function;
  };
  data: {
    show: {
      css: object;
    };
    event: {
      name: string;
      date: string;
      time: string;
      description: string;
      cost: string;
    };
    _id: string;
  };
}

export default function EditEvent(Props: propsTypes) {
  const dispatch = useDispatch();
  // manage currently edited events state
  const [eventData, setEventData] = useState({
    name: Props.data.event.name,
    date: Props.data.event.date,
    time: Props.data.event.time,
    description: Props.data.event.description,
    cost: Props.data.event.cost,
  });

  const handleSaveEdit = (ID: string) => {
    crudActions.Update(ID, "events", eventData).then((res) => {
      if (res.success === true) {
        dispatch(
          dataActions({
            requested: "events",
            data: res.data,
          })
        );
        Props.actions.setShow({ show: false, css: { display: "none" } });
      }
    });
  };

  return (
    <div className="modal_container" style={Props.data.show.css}>
      <div className="modal">
        <div className="bg-slate-700 text-center text-3xl pt-2 pb-2 rounded-t-xl grid grid-cols-3">
          <div />
          <div>Edit Event</div>
          <div className="flex justify-end mr-3">
            <button
              onClick={() =>
                Props.actions.setShow({ show: false, css: { display: "none" } })
              }
            >
              X
            </button>
          </div>
        </div>
        <div className="bg-slate-100">
          <div className="flex justify-center pt-8 pb-8">
            <form className="flex flex-col text-slate-800">
              Date:
              <input
                type="date"
                value={eventData.date}
                required
                onChange={(e) =>
                  setEventData({ ...eventData, date: e.target.value })
                }
              />
              Name:
              <input
                required
                value={eventData.name}
                type="string"
                onChange={(e) =>
                  setEventData({ ...eventData, name: e.target.value })
                }
              />
              Time Opens:
              <input
                required
                type="time"
                value={eventData.time}
                onChange={(e) =>
                  setEventData({ ...eventData, time: e.target.value })
                }
              />
              Description:
              <textarea
                required
                value={eventData.description}
                onChange={(e) =>
                  setEventData({ ...eventData, description: e.target.value })
                }
              />
              Door Cost:
              <input
                required
                value={eventData.cost}
                type="number"
                onChange={(e) =>
                  setEventData({ ...eventData, cost: e.target.value })
                }
              />
            </form>
          </div>
        </div>
        <div className="bg-slate-700 flex justify-end">
          <button
            className="bg-slate-300 pt-1 pb-1 pr-3 pl-3 m-3 rounded-xl text-xl"
            onClick={() => handleSaveEdit(Props.data._id)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
