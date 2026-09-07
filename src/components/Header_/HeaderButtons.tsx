"use client";

import axios from "axios";
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
  // matches up: localStorage doesn't exist during SSR, so the value has to
  // be read after mount, same pattern as contentDataSlice's hydration.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- deliberate SSR/CSR hydration split, not an avoidable effect
    setUsername(Storage.getItem("user"));
  }, []);

  return (
    <h1 className="pl-4 sm:block md:hidden lg:hidden xl:block">{username}</h1>
  );
}

export function LogoutButton() {
  const router = useRouter();
  async function logout() {
    // the token is an HttpOnly cookie now - JS can't clear it directly,
    // so this has to actually ask the server to.
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/user/logout`,
      {},
      { withCredentials: true }
    );
    router.push("/login");
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
