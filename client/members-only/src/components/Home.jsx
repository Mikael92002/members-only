import styles from "../css/Home.module.css";
import { useEffect } from "react";
import { useState } from "react";
import { messagesFetch, userFetch, signOut } from "../fetches";
import Header from "./Header";
import { useNavigate } from "react-router";

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
        <Header></Header> <button onClick={() => signOutFetch()}>Sign out</button>
        <div className={styles.messages_container}></div>
        {messageArray.length > 0 && (
          <>
            <div className={styles.message_section}>
              {messageArray.map((messageItem) => {
                return (
                  <li key={messageItem.id} className={styles.message_container}>
                    <div className={styles.message_username}>
                      {messageItem.username}
                    </div>
                    <div className={styles.message}>{messageItem.message}</div>
                  </li>
                );
              })}
            </div>
          </>
        )}
        <button onClick={() => console.log(user.user.username)}>
          click for user
        </button>
        <button onClick={() => console.log(messages)}>click for messages</button>
        
      </>
    );
  } else {
    return <ErrorPage />;
  }
};

export default Home;
