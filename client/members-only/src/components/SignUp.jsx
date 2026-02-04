import { useState } from "react";
import styles from "../css/Form.module.css";
import { signUpFetch, logInFetch } from "../fetches";
import { useNavigate } from "react-router";

const SignUp = () => {
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  async function handleSignUp(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    let dataAsObjects = Object.fromEntries(formData);
    console.log("data being sent: ", dataAsObjects);

    const signUp = await signUpFetch(dataAsObjects, setErrors);
    if (signUp.ok) {
      const logIn = await logInFetch(dataAsObjects);
      if (logIn.url.endsWith("/success")) {
        navigate("/");
      }
    }
  }

  return (
    <>
      <div className={styles.form_container}>
        <h2>SIGN UP:</h2>
        {errors.map((error) => {
          return (
            <div className={styles.error} key={error.msg}>
              {error.msg}
            </div>
          );
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

      <button onClick={() => console.log(errors)}>log errors</button>
    </>
  );
};

export default SignUp;
