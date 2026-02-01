import Header from "./Header";

import styles from "../css/Form.module.css";
import { Link } from "react-router";
import LogIn from "./LogIn";
import SignUp from "./SignUp";

const Auth = () => {
  return (
    <div className={styles.flex_container}>
      <Link to="/">
        <Header></Header>
      </Link>{" "}
      <LogIn></LogIn>
      <SignUp></SignUp>
      <div className={styles.whispers_div}>
        Just take me to the{" "}
        <Link to="/">
          <strong className={styles.whispers}>WHISPERS</strong>
        </Link>
      </div>
    </div>
  );
};

export default Auth;
