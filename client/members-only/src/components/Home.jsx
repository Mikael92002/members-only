import styles from "../css/Home.module.css";
import suit from "../assets/suit.png";
import { useEffect } from "react";
import { useState } from "react";
import { messagesFetch, userFetch } from "../fetches";

const Home = () => {
  const [user, setUser] = useState({});
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const messageArray = messages.messages;

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
        <h1 className={styles.title}>
          <span>MIDNIGHT</span>{" "}
          <img src={suit} alt="" className={styles.title_pic} />{" "}
          <span>WHISPERS</span>
        </h1>
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
        <button onClick={() => console.log(messages)}>click messages</button>
      </>
    );
  } else {
    return <ErrorPage />;
  }
};

export default Home;
