"use client";

import { useRouter } from "next/navigation";
import Storage from "./storage";

function TokenChecker(Props: { location: string }) {
  const router = useRouter();

  if (!Storage.getItem("token") && Props.location === "dash") {
    router.push("/login");
  } else if (Props.location === "login" && Storage.getItem("token")) {
    router.push("/dash");
  }
  return <></>;
}

export default TokenChecker;
