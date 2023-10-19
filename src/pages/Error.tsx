import { Rubik } from "next/font/google";

const rubik = Rubik({ subsets: ["latin"] });

function Error() {
  return (
    <div className={rubik.className}>
      <h1></h1>
    </div>
  );
}

export default Error;
