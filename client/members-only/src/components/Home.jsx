import styles from "../css/Home.module.css";
import { useEffect } from "react";
import { useState } from "react";
import { messagesFetch, userFetch, signOut } from "../fetches";
import { useNavigate } from "react-router";
import MessageArray from "./MessageArray";
import MessageInput from "./MessageInput";
import { useRef } from "react";
import SecretFooter from "./SecretFooter";
import { useContext } from "react";
import { UserContext } from "./UserContext";

const Home = () => {
  // const [user, setUser] = useState({});
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const messageEndRef = useRef(null);
  const user = useContext(UserContext);

  // only if user is a member:
  useEffect(() => {
    async function fetchUserAndMessages() {
      const userFetchResults = await userFetch();
      const messageFetchResults = await messagesFetch(
        userFetchResults.user?.id,
        userFetchResults.user?.is_member,
      );
      setMessages(messageFetchResults.messages);
      setLoading(false);
    }
    fetchUserAndMessages();
  }, []);

  // to scroll to bottom when user sends new message:
  useEffect(() => {
    function scrollToBottom() {
      messageEndRef.current?.scrollIntoView({ behavior: "auto" });
    }
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  async function handleSetMessages(newMessage, action) {
    switch (action) {
      case "add":
        setMessages((prevMessages) => {
          return [...prevMessages, newMessage];
        });
        break;

      case "delete":
        setMessages((prevMessages) => {
          return prevMessages.filter((message) => message.id !== newMessage.id);
        });
        break;
    }
  }

  async function signOutFetch() {
    const signOutSuccess = await signOut();
    if (signOutSuccess) {
      navigate("/auth");
    }
  }

  if (loading) {
    return <div className={styles.loading}></div>;
  } else {
    return (
      <div className={styles.home_wrapper}>
        {Object.keys(user).length > 0 && (
          <h3 className={styles.welcome}>
            Welcome, "{user.user.username}"... Click
            <button onClick={() => signOutFetch()}>Here</button>
            to sign out
          </h3>
        )}
        {Object.keys(user).length === 0 && (
          <h3 className={styles.welcome}>
            You're not signed in... Click{" "}
            <button onClick={() => navigate("/auth")}>Here</button> to log in or
            sign up
          </h3>
        )}
        {messages.length > 0 && (
          <MessageArray
            messageArray={messages}
            messageEndRef={messageEndRef}
            handleSetMessages={handleSetMessages}
          ></MessageArray>
        )}
        {Object.keys(user).length > 0 && (
          <>
            <MessageInput
              user={user.user}
              handleSetMessages={handleSetMessages}
            ></MessageInput>
            {!user.user.is_member && (
              <SecretFooter is_member={user.user.is_member}></SecretFooter>
            )}
          </>
        )}
      </div>
    );
  }
};

export default Home;
