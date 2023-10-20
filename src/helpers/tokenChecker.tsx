"use client";

import { useRouter } from "next/navigation";
import Storage from "./storage";

function TokenChecker(Props: { location: string }) {
  const router = useRouter();

  if (!Storage.getItem("token") && Props.location === "dash") {
    console.log("routing to /login");
    router.push("/login");
  } else if (Props.location === "login" && Storage.getItem("token")) {
    console.log("routing to /home");
    router.push("/dash");
  }
  // else if (Props.location === "none") {
  //   if (!Storage.getItem("token")) {
  //     router.push("/login");
  //   } else {
  //     router.push("/home");
  //   }
  // }
  return <></>;
}

export default TokenChecker;
