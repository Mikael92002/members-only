import { useState } from "react";
import { updateMemberToTrue, userFetch } from "../fetches";
import { useContext } from "react";
import { UserContext } from "./UserContext";

const SecretCode = () => {
  const [answer, setAnswer] = useState("");
  const [error, setMessage] = useState("");
  const user = useContext(UserContext);

  async function validateAnswer() {
    const sanitized = answer.trim().toLowerCase();
    if (sanitized === "-sin(x)+cos(x)" || sanitized === "cos(x)-sin(x)") {
      const currUser = await userFetch();
      const updateMemberToTrueFetch = await updateMemberToTrue(
        currUser.user.id,
      );
      if (updateMemberToTrueFetch) {
        setMessage("That's correct fella!");
        return;
      }
    }
    setMessage("Wrong answer amigo");
  }

  const divStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "8px",
  };
  const buttonStyle = {
    backgroundColor: "red",
    color: "white",
    fontWeight: 900,
  };

  if (Object.keys(user).length > 0 && user.user.is_member) {
    return <>You are already a member!</>;
  } else {
    return (
      <div>
        <h1 style={divStyles}>Congratulations! You found the secret page!</h1>
        <div style={divStyles}>
          To become a member, which allows you to see other members' names and
          delete their messages, you must answer the following simple equation:
          d/dx(cos(x)+sin(x))
        </div>
        <div style={{ color: "yellow", textAlign: "center" }}>{error}</div>
        <div style={divStyles}>
          <input
            type="text"
            name="answer"
            id="answer"
            placeholder="Your answer goes here..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                validateAnswer();
              }
            }}
          />
          <button style={buttonStyle} onClick={() => validateAnswer()}>
            Submit
          </button>
        </div>
      </div>
    );
  }
};
export default SecretCode;
