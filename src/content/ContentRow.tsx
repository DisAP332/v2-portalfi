"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import crudActions from "@/helpers/crudActions";
import { dataActions } from "@/redux/slices/contentDataSlice";
import { ContentTypeConfig } from "@/content-types/schema";
import { truncated } from "@/content-types/renderHelpers";
import ContentForm from "./ContentForm";

interface ContentRowProps<T extends object> {
  config: ContentTypeConfig<T>;
  item: T & { _id: string; Name: string };
}

export default function ContentRow<T extends object>({ config, item }: ContentRowProps<T>) {
  const dispatch = useDispatch();
  const [showEdit, setShowEdit] = useState({
    show: false,
    css: { display: "none" },
  });

  const handleDelete = () => {
    crudActions.Delete(item._id, config.key).then((res) => {
      if (!res) return;
      dispatch(dataActions({ requested: config.key, data: res.data as object[] }));
    });
  };

  const Buttons = (
    <div className="text-slate-100 ml-4">
      <button
        className="editBtn bg-slate-400"
        onClick={() => setShowEdit({ show: true, css: { display: "flex" } })}
      >
        Edit
      </button>
      <button className="deleteBtn bg-red-600" onClick={handleDelete}>
        delete
      </button>
    </div>
  );

  return (
    <>
      <ContentForm
        config={config}
        show={showEdit}
        setShow={setShowEdit}
        editing={{ _id: item._id, item }}
      />
      {/* desktop */}
      <div
        id="card"
        className="text-slate-700 hidden lg:grid"
        style={{ display: "grid", gridTemplateColumns: config.desktopGridColumns }}
      >
        {config.columns.map((column) => (
          <div key={column.key}>
            {column.render ? column.render(item) : <h1>{String((item as any)[column.key])}</h1>}
          </div>
        ))}
        {Buttons}
      </div>
      {/* tablet */}
      <div className="hidden md:grid mdGrid lg:hidden" id="card">
        <div>
          <h1>
            {item.Name.length < 15 ? item.Name : item.Name.slice(0, 14) + "..."}
          </h1>
        </div>
        <div>{truncated(String((item as any)[config.summaryKey]), 28)}</div>
        {Buttons}
      </div>
      {/* mobile */}
      <div className="grid sm:hidden smGrid" id="card">
        <div>
          <h1>{item.Name}</h1>
        </div>
        {Buttons}
      </div>
    </>
  );
}
