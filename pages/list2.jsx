import React, { useEffect, useState } from "react";
import api from '@/config/api'

export default function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    api
      .get("/users/cairofelipedev")
      .then((response) => setUser(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);

  return (
    <div className="App">
      <p>Usuário: {user?.login}</p>
    </div>
  );
}