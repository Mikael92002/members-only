import styles from "../css/Home.module.css"

const MessageArray = ({messageArray}) =>{
    return (
        <>
        <div className={styles.message_section}>
                      {messageArray.map((messageItem) => {
                        const date = new Date(
                          messageItem.message_date,
                        ).toLocaleString();
                        return (
                          <li key={messageItem.id} className={styles.message_container}>
                            <div className={styles.message_username}>
                              {messageItem.username} @ {date}:
                            </div>
                            <div className={styles.message}>{messageItem.message}</div>
                          </li>
                        );
                      })}
                    </div>
        </>
    )
}

export default MessageArray;