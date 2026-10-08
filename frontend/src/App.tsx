import { useEffect, useState } from "react";

export default function App() {
  const [time, setTime] = useState<string>("loading...");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/time`)
      .then((r) => r.json())
      .then((d) => setTime(d.now))
      .catch(() => setTime("API unreachable"));
  }, []);

  return <h1>DB time: {time}</h1>;
}