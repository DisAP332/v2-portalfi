import TokenChecker from "@/helpers/tokenChecker";

function Home() {
  return (
    <>
      <TokenChecker location="dash" token={false} />
    </>
  );
}

export default Home;
