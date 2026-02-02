import suit from "../assets/suit.png";

const Header = () => {
  return (
    <h1 className="title">
      <span>MIDNIGHT</span> <img src={suit} alt="" className="title_pic" />{" "}
      <span>WHISPERS</span>
    </h1>
  );
};

export default Header;
