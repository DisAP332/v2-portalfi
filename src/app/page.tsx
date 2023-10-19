import Storage from "@/helpers/storage";
import App from "@/pages/App";
import Login from "@/pages/Login";

export default function Home() {
  console.log(Storage.getItem("token"));
  if (!Storage.getItem("token")) {
    return <Login />;
  } else {
    return <App />;
  }
}
