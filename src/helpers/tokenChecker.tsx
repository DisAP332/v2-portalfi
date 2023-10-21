"use client";

import { useRouter } from "next/navigation";
import Storage from "./storage";
import { useEffect } from "react";

function TokenChecker(Props: { location: string }) {
  const router = useRouter();

  // wrap in use effect in order to prevent refrence error
  useEffect(() => {
    if (!Storage.getItem("token") && Props.location === "dash") {
      router.push("/login");
    } else if (Props.location === "login" && Storage.getItem("token")) {
      router.push("/dash");
    }
  });

  return <></>;
}

export default TokenChecker;
