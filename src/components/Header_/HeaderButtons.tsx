"use client";

import crudActions from "@/helpers/crudActions";
import Storage from "@/helpers/storage";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

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
  const [username, setUsername] = useState("");

  // use effect is used so our server and client information for username
  // matches up
  useEffect(() => {
    setUsername(Storage.getItem("user"));
  }, []);

  return (
    <h1 className="pl-4 sm:block md:hidden lg:hidden xl:block">{username}</h1>
  );
}

export function LogoutButton() {
  const router = useRouter();
  function logout() {
    // purposefully only deleting the token so when they log in no need to
    // fetch more data.
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
