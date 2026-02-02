import styles from "../css/Home.module.css";

const MessageArray = ({ messageArray, messageEndRef }) => {
  return (
    <div className={styles.message_container}>
      {messageArray.map((messageItem) => {
        const date = new Date(messageItem.message_date).toLocaleString();
        return (
          <li key={messageItem.id} className={styles.message_bubble}>
            <div className={styles.message_username}>
              <strong>{messageItem.username ?? "ANONYMOUS"}</strong> @ {date}:
            </div>
            <div className={styles.message}>{messageItem.message}</div>
          </li>
        );
      })}
      <div ref={messageEndRef}></div>
    </div>
  );
};

export default MessageArray;
