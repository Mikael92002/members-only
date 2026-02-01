import LogIn from "./components/LogIn";
import { useParams } from "react-router";
import ErrorPage from "./ErrorPage";
import Home from "./components/Home";

function Page() {
  const { currPage } = useParams();
  return (
    <>
      {currPage === "home" ? (
        <>
          <Home></Home>
        </>
      ) : currPage === undefined ? (
        <LogIn></LogIn>
      ) : (
        <ErrorPage />
      )}
    </>
  );
}

export default Page;
