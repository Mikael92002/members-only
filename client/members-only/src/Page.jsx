import Auth from "./components/Auth";
import { useParams } from "react-router";
import ErrorPage from "./ErrorPage";
import Home from "./components/Home";
import Header from "./components/Header";
import SecretCode from "./components/SecretCode";

function Page() {
  const { currPage } = useParams();

  return (
    <>
        {currPage === undefined ? (
          <>
            <Header></Header>
            <Home></Home>
          </>
        ) : currPage === "auth" ? (
          <>
            <Header></Header>
            <Auth></Auth>
          </>
        ) : currPage === "secret" ? (
          <SecretCode></SecretCode>
        ) : (
          <ErrorPage />
        )}
    </>
  );
}

export default Page;
