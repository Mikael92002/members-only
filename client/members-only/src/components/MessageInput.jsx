import { useState } from "react";
import styles from "../css/Home.module.css";

const MessageInput = ({ userID = null, handleSetMessages }) => {
  const [messageInput, setMessageInput] = useState("");

  async function postMessage(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    let dataAsObjects = Object.fromEntries(formData);
    dataAsObjects.messageDate = new Date().toISOString();

    try {
      const postMessageResponse = await fetch(`/api/messages/${userID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataAsObjects),
      });
      if (postMessageResponse.ok) {
        console.log("message successfully sent");
        const messageObject = await postMessageResponse.json();
        console.log(messageObject);
        handleSetMessages();
        setMessageInput("");
      }
    } catch (e) {
      console.error(e);
    }
  }

  function handleMessageInput(e) {
    setMessageInput(e.target.value);
  }

  return (
    <>
      <form
        className={styles.message_input_form}
        onSubmit={(e) => postMessage(e)}
      >
        <label htmlFor="message"></label>
        <input
          type="text"
          maxLength={250}
          placeholder="Your message here..."
          name="message"
          id="message"
          className={styles.message_input}
          value={messageInput}
          onChange={(e) => handleMessageInput(e)}
        />
        <button type="submit">Post</button>
      </form>
    </>
  );
};

export default MessageInput;
