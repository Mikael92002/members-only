import styles from "../css/Home.module.css";
import suit from "../assets/suit.png";
import { useContext } from "react";
import { MessageArrayContext } from "../contexts/MessageArrayContext";

const Home = () => {
  const messages = useContext(MessageArrayContext);
  const messageArray = messages.messages;
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
              return <li>{messageItem.message}</li>;
            })}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
