import styles from "../css/Home.module.css";
import suit from "../assets/suit.png";

const Header = () => {
  return (
    <h1 className={styles.title}>
      <span>MIDNIGHT</span>{" "}
      <img src={suit} alt="" className={styles.title_pic} />{" "}
      <span>WHISPERS</span>
    </h1>
  );
};

export default Header;
