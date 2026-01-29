import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [data, setData] = useState({});
  useEffect(() => {
    async function testFetch() {
      try {
        const response = await fetch("/api");
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
      <div>{data.hello}</div>
    </>
  );
}

export default App;
