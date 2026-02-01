import Auth from "./components/Auth";
import { useParams } from "react-router";
import ErrorPage from "./ErrorPage";
import Home from "./components/Home";

function Page() {
  const { currPage } = useParams();
  return (
    <>
      {currPage === undefined ? (
        <>
          <Home></Home>
        </>
      ) : currPage === "auth" ? (
        <Auth></Auth>
      ) : (
        <ErrorPage />
      )}
    </>
  );
}

export default Page;
