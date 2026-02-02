import styles from "../css/Home.module.css";
import { useEffect } from "react";
import { useState } from "react";
import {
  messagesFetch,
  userFetch,
  signOut,
  anonymousMessagesFetch,
} from "../fetches";
import { useNavigate } from "react-router";
import MessageArray from "./MessageArray";
import MessageInput from "./MessageInput";
import { useRef } from "react";

const Home = () => {
  const [user, setUser] = useState({});
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const messageArray = messages.messages;
  const navigate = useNavigate();
  const messageEndRef = useRef(null);

  // only if user is a member:
  useEffect(() => {
    async function fetchUserAndMessages() {
      const userFetchResults = await userFetch();
      setUser(userFetchResults);
      if (userFetchResults?.user.is_member) {
        const messagesFetchResults = await messagesFetch();
        setMessages(messagesFetchResults);
        setLoading(false);
      } else {
        const anonymousMessageFetchResults = await anonymousMessagesFetch();
        setMessages(anonymousMessageFetchResults);
        setLoading(false);
      }
    }
    fetchUserAndMessages();
  }, []);

  // to scroll to bottom when user sends new message:
  useEffect(() => {
    function scrollToBottom() {
      messageEndRef.current?.scrollIntoView({ behavior: "auto" });
    }
    if (messages.messages?.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  async function handleSetMessages() {
    const messagesFetchResults = await messagesFetch();
    setMessages(messagesFetchResults);
  }

  async function signOutFetch() {
    const signOutSuccess = await signOut();
    if (signOutSuccess) {
      navigate("/auth");
    }
  }

  if (loading) {
    return <>LOADING</>;
  } else {
    return (
      <div className={styles.home_wrapper}>
        {Object.keys(user).length > 0 && (
          <h3 className={styles.welcome}>
            Welcome, "{user.user.username}"... Click
            <button className={styles.sign_out} onClick={() => signOutFetch()}>
              Here
            </button>
            to sign out
          </h3>
        )}
        {Object.keys(user).length === 0 && (
          <h3 className={styles.auth}>
            You're not signed in... Click{" "}
            <button onClick={() => navigate("/auth")}>Here</button> to log in or
            sign up
          </h3>
        )}
        {messageArray.length > 0 && (
          <MessageArray
            messageArray={messageArray}
            messageEndRef={messageEndRef}
          ></MessageArray>
        )}
        {/* <button onClick={() => console.log(user.user.username)}>
          click for user
        </button>
        <button onClick={() => console.log(messages)}>
          click for messages
        </button> */}
        {Object.keys(user).length > 0 && (
          <MessageInput
            userID={user.user.id}
            handleSetMessages={handleSetMessages}
          ></MessageInput>
        )}
      </div>
    );
  }
};

export default Home;
