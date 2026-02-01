import { useNavigate } from "react-router";
import Header from "./Header";
import { useEffect } from "react";
import { userFetch } from "../fetches";

const LogIn = () => {
  const navigate = useNavigate();
  useEffect(() => {
    async function is_signed_in() {
      const userFetchResults = await userFetch();
      if (userFetchResults.user) {
        navigate("/home");
      }
    }
    is_signed_in();
  }, [navigate]);
  return (
    <>
      <Header></Header>
      <form action="/api/logIn" method="POST" onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="username">
          Username:
          <input type="text" name="username" id="username" />
        </label>
        <label htmlFor="password">
          Password:
          <input type="password" name="password" id="password" />
        </label>
        <button type="submit">Log In</button>
      </form>
    </>
  );

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
          navigate("/home");
        }
      }
    } catch (e) {
      console.error(e);
    }
  }
};

export default LogIn;
