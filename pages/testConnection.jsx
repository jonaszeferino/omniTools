import { useState, useEffect } from "react";
import { connectionRdsMySql } from "../components/connectiondb";

export default function TestConnection() {
  const [connectionMessage, setConnectionMessage] = useState("");

  useEffect(() => {
    async function testConnection() {
      try {
        const connection = await connectionRdsMySql();
        await connection.query("SELECT 1");
        setConnectionMessage("Conexão bem sucedida!");
        connection.end();
      } catch (err) {
        setConnectionMessage(`Erro na conexão: ${err.message}`);
      }
    }
    testConnection();
  }, []);

  return (
    <>
      {connectionMessage && alert(connectionMessage)}
      Connection Test
    </>
  );
}






