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
  item: T & { _id: string };
}

export default function ContentRow<T extends object>({ config, item }: ContentRowProps<T>) {
  const dispatch = useDispatch();
  const [showEdit, setShowEdit] = useState({
    show: false,
    css: { display: "none" },
  });
  // remounts ContentForm (via its key below) each time Edit opens, so its
  // state always starts from the current item instead of whatever was
  // last loaded into a form that stays mounted (just hidden) between opens.
  const [editOpenCount, setEditOpenCount] = useState(0);
  const title = String((item as any)[config.titleKey]);

  const handleDelete = () => {
    crudActions.Delete(item._id, config.key).then((res) => {
      if (!res || !res.success) return;
      dispatch(dataActions({ requested: config.key, data: res.data as object[] }));
    });
  };

  const Buttons = (
    <div className="text-slate-100 ml-4">
      <button
        className="editBtn bg-slate-400"
        onClick={() => {
          setEditOpenCount((count) => count + 1);
          setShowEdit({ show: true, css: { display: "flex" } });
        }}
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
        key={editOpenCount}
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
          <h1>{title.length < 15 ? title : title.slice(0, 14) + "..."}</h1>
        </div>
        <div>{truncated(String((item as any)[config.summaryKey]), 28)}</div>
        {Buttons}
      </div>
      {/* mobile */}
      <div className="grid sm:hidden smGrid" id="card">
        <div>
          <h1>{title}</h1>
        </div>
        {Buttons}
      </div>
    </>
  );
}
