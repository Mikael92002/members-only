import Auth from "./components/Auth";
import { useParams } from "react-router";
import ErrorPage from "./ErrorPage";
import Home from "./components/Home";
import Header from "./components/Header";
import SecretCode from "./components/SecretCode";
import { UserContext } from "./components/UserContext";
import { useEffect, useState } from "react";
import { userFetch } from "./fetches";

function Page() {
  const { currPage } = useParams();
  const [user, setUser] = useState({});
  useEffect(() => {
    async function fetchUser() {
      const userFetchResults = await userFetch();
      setUser(userFetchResults);
    }
    fetchUser();
  }, [currPage]);

  return (
    <>
      <UserContext value={user}>
        <Header></Header>
        {currPage === undefined ? (
          <>
            <Home></Home>
          </>
        ) : currPage === "auth" ? (
          <>
            <Auth></Auth>
          </>
        ) : currPage === "secret" ? (
          <SecretCode></SecretCode>
        ) : (
          <ErrorPage />
        )}
      </UserContext>
    </>
  );
}

export default Page;
