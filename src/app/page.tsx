import TokenChecker from "@/helpers/tokenChecker";
import App from "@/pages/App";
import Login from "@/pages/Login";

import { cookies } from "next/headers";

export default function Home() {
  const cookieStore = cookies();
  const token = cookieStore.has("JBWtoken");
  return <TokenChecker location="first" token={token} />;
}
