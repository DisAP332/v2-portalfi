"use client";

import { useRouter } from "next/navigation";
import Storage from "./storage";

function TokenChecker(Props: { location: string }) {
  const router = useRouter();

  if (!Storage.getItem("token") && Props.location === "dash") {
    window.alert("routing to /login");
    router.push("/login");
  } else if (Props.location === "login" && Storage.getItem("token")) {
    window.alert("routing to /dash");
    router.push("/dash");
  }
  return <></>;
}

export default TokenChecker;
