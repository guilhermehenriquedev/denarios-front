import React, { useEffect, useState } from "react";
import api from '@/config/api'

export default function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    api
      .get("/api/exchanges/list/")
      .then((response) => setUser(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);
  console.log(user?.data[0]);
  return (
    <div className="App">
      <p>Moeda: {user?.data[0].no_cripto}</p>
    </div>
  );
}