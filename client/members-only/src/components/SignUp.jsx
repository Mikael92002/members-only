import { useState } from "react";
import styles from "../css/Form.module.css";

const SignUp = () => {
  const [success, setSuccess] = useState(false);

  async function handleSignUp(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    let dataAsObjects = Object.fromEntries(formData);
    console.log("data being sent: ", dataAsObjects);

    try {
      const postSignUpResponse = await fetch("/api/auth/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataAsObjects),
      });
      if (postSignUpResponse.ok) {
        console.log("successful sign up");
        setSuccess(true);
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      {!success && (
        <div className={styles.form_container}>
          <h2>SIGN UP:</h2>
          <form
            action="/api/signUp"
            method="POST"
            onSubmit={(e) => handleSignUp(e)}
          >
            <label htmlFor="username">
              Username:
              <input type="text" name="username" id="sign-username" />
            </label>
            <label htmlFor="password">
              Password:
              <input type="password" name="password" id="sign-password" />
            </label>
            <button type="submit">Sign up</button>
          </form>
        </div>
      )}
      {success && (
        <div className={styles.success}>Successful sign up... Log in above</div>
      )}
    </>
  );
};

export default SignUp;
