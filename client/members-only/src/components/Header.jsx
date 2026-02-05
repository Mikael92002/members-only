import suit from "../assets/suit.png";
import { Link } from "react-router";

const Header = () => {
  return (
    <h1 className="title">
      <Link to="/" className="title-link"><span>MIDNIGHT</span> <img src={suit} alt="" className="title_pic" />{" "}
      <span>WHISPERS</span></Link>
    </h1>
  );
};

export default Header;
