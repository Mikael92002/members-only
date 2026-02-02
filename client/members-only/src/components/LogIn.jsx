import { useNavigate } from "react-router";
import { useEffect } from "react";
import { userFetch } from "../fetches";
import { useState } from "react";
import styles from "../css/Form.module.css";

const LogIn = () => {
  const navigate = useNavigate();

  useEffect(() => {
    async function is_signed_in() {
      const userFetchResults = await userFetch();
      if (userFetchResults.user) {
        navigate("/");
      }
    }
    is_signed_in();
  }, [navigate]);

  const [errorMessage, setErrorMessage] = useState(" ");

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    let dataAsObjects = Object.fromEntries(formData);

    try {
      const postLogInResponse = await fetch("/api/auth/logIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataAsObjects),
      });
      if (postLogInResponse.ok) {
        console.log("successful post");
        console.log(postLogInResponse);
        if (postLogInResponse.url.endsWith("/success")) {
          navigate("/");
          setErrorMessage("");
        } else if (postLogInResponse.url.endsWith("/failure")) {
          setErrorMessage("INCORRECT USERNAME OR PASSWORD!");
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
      <div className={styles.form_container}>
        <h2>LOG IN:</h2>
        <div className={styles.error}>
          <strong>{errorMessage}</strong>
        </div>
        <form
          onSubmit={(e) => handleSubmit(e)}
        >
          <label htmlFor="username">
            Username:
            <input type="text" name="username" id="log-username" required />
          </label>
          <label htmlFor="password">
            Password:
            <input type="password" name="password" id="log-password" required />
          </label>
          <button type="submit">Log In</button>
        </form>
      </div>
  );
};

export default LogIn;
