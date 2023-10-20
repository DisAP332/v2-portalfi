"use client";

import crudActions from "@/helpers/crudActions";
import Storage from "@/helpers/storage";
import { useRouter } from "next/navigation";

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
  return (
    <h1 className="pl-4 sm:block md:hidden lg:block">
      {Storage.getItem("user")}
    </h1>
  );
}

export function LogoutButton() {
  const router = useRouter();
  function logout() {
    Storage.removeItem("token");
    router.push("/");
  }

  return (
    <button
      className="bg-slate-800 h-5/6 pl-6 pr-6 rounded-2xl"
      onClick={() => logout()}
    >
      Log Out
    </button>
  );
}
