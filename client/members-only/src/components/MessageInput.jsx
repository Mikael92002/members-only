import { useState } from "react";
import styles from "../css/Home.module.css";
import { postMessageFetch } from "../fetches";

const MessageInput = ({ user, handleSetMessages }) => {
  const [messageInput, setMessageInput] = useState("");

  async function postMessage(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    let dataAsObjects = Object.fromEntries(formData);
    if (dataAsObjects.message.trim().length === 0) {
      return;
    }
    dataAsObjects.messageDate = new Date().toISOString();

    const postMessageResponse = await postMessageFetch(user.id, dataAsObjects);
    if (postMessageResponse.ok) {
      let message = await postMessageResponse.json();
      message.username = user.username;
      handleSetMessages(message, "add");
      setMessageInput("");
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
          required
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
