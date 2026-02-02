import { useState } from "react";
import styles from "../css/Form.module.css";

const SignUp = () => {
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState([]);

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
        setErrors([]);
      } else {
        const json = await postSignUpResponse.json();
        setErrors(json.errors);
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
          {errors.map((error) => {
            return <div className = {styles.error}key={error.msg}>{error.msg}</div>;
          })}
          <form onSubmit={(e) => handleSignUp(e)}>
            <label htmlFor="username">
              Username:
              <input type="text" name="username" id="sign-username" required />
            </label>
            <label htmlFor="password">
              Password:
              <input
                type="password"
                name="password"
                id="sign-password"
                required
                minLength="8"
              />
            </label>
            <button type="submit">Sign up</button>
          </form>
        </div>
      )}
      {success && (
        <div className={styles.success}>Successful sign up... Log in above</div>
      )}
      <button onClick={() => console.log(errors)}>log errors</button>
    </>
  );
};

export default SignUp;
