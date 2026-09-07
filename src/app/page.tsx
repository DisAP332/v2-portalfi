import { redirect } from "next/navigation";

// proxy.ts already redirects every request to this route (to /login or
// /dash, depending on session validity) before it ever renders - this is
// just the fallback for the case where it somehow doesn't.
export default function Home() {
  redirect("/login");
}
