import { createElement, useState, useEffect } from "./framework.js";
import { fetchUsers } from "./api.js";

export function App() {
  console.log("App render");

  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log("App useEffect triggered");
    
    fetchUsers().then((data) => {
      console.log("setting users:", data);

      setUsers(data);
    });
  }, []);

  return createElement(
    "div",
    null,
    "Users List:",
    ...users.map((u) =>
      createElement("p", null, `id: ${u.id}, name: ${u.name}`)
    )
  );
}