import localFont from "next/font/local";

// self-hosted (was next/font/google's Rubik) - fetching from Google at
// build time meant the build couldn't complete without reaching it.
const rubik = localFont({ src: "../assets/fonts/Rubik-Variable.woff2" });

function Error() {
  return (
    <div className={rubik.className}>
      <h1></h1>
    </div>
  );
}

export default Error;
