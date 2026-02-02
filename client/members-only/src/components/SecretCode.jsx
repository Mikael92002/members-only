import { useState } from "react";
import { updateMemberToTrue, userFetch } from "../fetches";

const SecretCode = () => {
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");

  async function validateAnswer() {
    const sanitized = answer.trim().toLowerCase();
    if (sanitized === "-sin(x)+cos(x)" || sanitized === "cos(x)-sin(x)") {
      const currUser = await userFetch();
      const updateMemberToTrueFetch = await updateMemberToTrue(
        currUser.user.id,
      );
      if (updateMemberToTrueFetch) {
        setError("");
        console.log("success")
      }
      else{
        console.log("fail")
      }
    }
  }
  return (
    <div>
      <div>
        To become a member you must answer the following simple equation:
        d/dx(cos(x)+sin(x))
      </div>
      <input
        type="text"
        name="answer"
        id="answer"
        placeholder="Your answer goes here..."
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <button onClick={() => validateAnswer()}>Submit</button>
    </div>
  );
};

export default SecretCode;
