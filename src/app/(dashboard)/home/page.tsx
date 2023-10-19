import TokenChecker from "@/helpers/tokenChecker";
import App from "@/pages/App";

function Home() {
  return (
    <>
      <App />
      <TokenChecker location="home" />
    </>
  );
}

export default Home;
