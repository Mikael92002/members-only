import envelope from "../assets/envelope.png";
import { Link } from "react-router";

const SecretFooter = () => {
  return (
    <footer>
      <Link to="/secret">
        <img
          src={envelope}
          alt=""
          style={{ height: "20px", width: "20px", marginBottom: "20px" }}
        />
      </Link>
    </footer>
  );
};

export default SecretFooter;
