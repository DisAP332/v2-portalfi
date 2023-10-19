"use client";

import crudActions from "@/helpers/crudActions";
import Storage from "@/helpers/storage";

export function HeaderPublish() {
  function handlePublish() {
    const data = {
      events: Storage.getItem("events"),
      foodItems: Storage.getItem("food"),
      drinks: Storage.getItem("drinks"),
    };
    crudActions.sortPublishData(data);
  }

  return (
    <button className="bg-slate-600 p-3" onClick={() => handlePublish()}>
      PUBLISH
    </button>
  );
}

export function DisplayUser() {
  return <h1 className="pl-4">{Storage.getItem("user")}</h1>;
}
