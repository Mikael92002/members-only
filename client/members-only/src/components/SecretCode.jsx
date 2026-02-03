import { useState } from "react";
import { updateMemberToTrue, userFetch } from "../fetches";

const SecretCode = () => {
  const [answer, setAnswer] = useState("");
  const [error, setMessage] = useState("");

  async function validateAnswer() {
    const sanitized = answer.trim().toLowerCase();
    if (sanitized === "-sin(x)+cos(x)" || sanitized === "cos(x)-sin(x)") {
      const currUser = await userFetch();
      const updateMemberToTrueFetch = await updateMemberToTrue(
        currUser.user.id,
      );
      if (updateMemberToTrueFetch) {
        setMessage("That's correct fella!");
        console.log("success");
        return;
      }
    }
    setMessage("Wrong answer amigo");
  }
  return (
    <div>
      <div>
        To become a member you must answer the following simple equation:
        d/dx(cos(x)+sin(x))
      </div>
      <div style={{ color: "yellow" }}>{error}</div>
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
      <button onClick={() => validateAnswer()}>Submit</button>
    </div>
  );
};

export default SecretCode;
