import styles from "../css/Home.module.css";
import { useEffect } from "react";
import { useState } from "react";
import { messagesFetch, userFetch, signOut } from "../fetches";
import Header from "./Header";
import { useNavigate } from "react-router";
import MessageArray from "./MessageArray";

const Home = () => {
  const [user, setUser] = useState({});
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const messageArray = messages.messages;
  const navigate = useNavigate();

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

  async function signOutFetch() {
    const signOutSuccess = await signOut();
    if (signOutSuccess) {
      navigate("/");
    }
  }

  if (loading) {
    return <>LOADING</>;
  } else if (Object.keys(user).length > 0) {
    return (
      <>
        <Header></Header>{" "}
        <button className={styles.sign_out} onClick={() => signOutFetch()}>
          Sign Out
        </button>
        <div className={styles.messages_container}></div>
        {messageArray.length > 0 && (
          <MessageArray messageArray={messageArray}></MessageArray>
        )}
        <button onClick={() => console.log(user.user.username)}>
          click for user
        </button>
        <button onClick={() => console.log(messages)}>
          click for messages
        </button>
      </>
    );
  } else {
    return <ErrorPage />;
  }
};

export default Home;
