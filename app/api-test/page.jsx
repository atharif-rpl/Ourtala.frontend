"use client";
import { useEffect, useState } from "react";

export default function ApiTestPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/test")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("Error fetching:", err));
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div style={{ padding: "2rem", fontFamily: "monospace" }}>
      <h2>Laravel API Response 👇</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
