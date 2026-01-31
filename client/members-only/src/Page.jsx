import { useState } from "react";
import { useEffect } from "react";
import LogIn from "./components/LogIn";
import { useParams } from "react-router";
import ErrorPage from "./ErrorPage";
import Home from "./components/Home";
import { MessageArrayContext } from "./contexts/MessageArrayContext";
import { messagesFetch, userFetch } from "./fetches";



function Page() {
  const [user, setUser] = useState({});
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currPage } = useParams();

  useEffect(() => {
    async function fetchUserAndMessages() {
      const userFetchResults = await userFetch();
      setUser(userFetchResults);
      const messagesFetchResults = await messagesFetch();
      setMessages(messagesFetchResults);
      setLoading(false);
    }
    fetchUserAndMessages();
  }, []);

  if (loading) {
    return <>LOADING</>;
  } else if (Object.keys(user).length > 0) {
    return (
      <>
        {currPage === undefined ? (
          <>
            <MessageArrayContext value={messages}>
              <Home></Home>
            </MessageArrayContext>
            Hello {user.user.username}
            <button onClick={() => console.log(user.user.username)}>
              click for user
            </button>
            <button onClick={() => console.log(messages)}>
              click messages
            </button>
          </>
        ) : (
          <ErrorPage />
        )}
      </>
    );
  } else {
    return (
      <>
        <div>Hello: </div>
        <LogIn></LogIn>
      </>
    );
  }
}

export default Page;
