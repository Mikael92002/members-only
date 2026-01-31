import { useState } from "react";
import { useEffect } from "react";
import LogIn from "./components/LogIn";

function App() {
  const [data, setData] = useState({});
  useEffect(() => {
    async function testFetch() {
      try {
        const response = await fetch("/api/user");
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setData(data);
        }
      } catch (err) {
        console.error(err);
      }
    }
    testFetch();
  }, []);

  return (
    <>
      <div>Hello: {data.user.username}</div>
      <LogIn></LogIn>
      <button onClick={() => console.log(data.user.username)}>click</button>
    </>
  );
}

export default App;
