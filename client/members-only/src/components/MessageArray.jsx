import styles from "../css/Home.module.css";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import { deleteMessageFetch } from "../fetches";

const MessageArray = ({ messageArray, messageEndRef, handleSetMessages }) => {
  const user = useContext(UserContext);

  async function deleteMessage(message) {
    const fetchDeleteMessage = await deleteMessageFetch(message.id);
    if (fetchDeleteMessage.ok) {
      handleSetMessages(message, "delete");
    }
  }
  return (
    <div className={styles.message_container}>
      {messageArray.map((messageItem) => {
        const date = new Date(messageItem.message_date).toLocaleString();
        return (
          <li key={messageItem.id} className={styles.message_bubble}>
            <div className={styles.message_username}>
              <strong>{messageItem.username ?? "ANONYMOUS"}</strong> @ {date}:
            </div>
            <div className={styles.message_bubble_trash}>
              <div className={styles.message}>{messageItem.message} </div>{" "}
              {user.user?.is_member && (
                <div className={styles.trash}>
                  <svg
                    fill="red"
                    width="30px"
                    height="30px"
                    viewBox="0 0 50 50"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => deleteMessage(messageItem)}
                  >
                    <path d="M20 18h2v16h-2z" />
                    <path d="M24 18h2v16h-2z" />
                    <path d="M28 18h2v16h-2z" />
                    <path d="M12 12h26v2H12z" />
                    <path d="M30 12h-2v-1c0-.6-.4-1-1-1h-4c-.6 0-1 .4-1 1v1h-2v-1c0-1.7 1.3-3 3-3h4c1.7 0 3 1.3 3 3v1z" />
                    <path d="M31 40H19c-1.6 0-3-1.3-3.2-2.9l-1.8-24 2-.2 1.8 24c0 .6.6 1.1 1.2 1.1h12c.6 0 1.1-.5 1.2-1.1l1.8-24 2 .2-1.8 24C34 38.7 32.6 40 31 40z" />
                  </svg>
                </div>
              )}
            </div>
          </li>
        );
      })}
      <div ref={messageEndRef}></div>
    </div>
  );
};

export default MessageArray;
