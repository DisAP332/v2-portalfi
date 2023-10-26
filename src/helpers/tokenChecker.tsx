"use client";

import { useRouter } from "next/navigation";
import Storage from "./storage";
import { useEffect } from "react";

function TokenChecker(Props: { location: string; token: boolean }) {
  const router = useRouter();

  // wrap in use effect in order to prevent refrence error
  useEffect(() => {
    if (Props.location === "first" && Props.token === false) {
      router.push("/login");
      return;
    } else if (Props.location === "first" && Props.token === true) {
      router.push("/dash");
    } else if (!Storage.getItem("token") && Props.location === "dash") {
      router.push("/login");
    } else if (Props.location === "login" && Storage.getItem("token")) {
      router.push("/dash");
    }
  });

  return <div></div>;
}

export default TokenChecker;
