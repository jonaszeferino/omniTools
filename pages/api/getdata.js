import mysql from "mysql2/promise";
import { getConnection } from "../connectiondb";

export default async function handler(req, res) {
  const connection = await getConnection();

  try {
    const query = "SELECT id,username, password, email FROM users";
    // const query = "SELECT * FROM users";
    const values = [];
    const [data] = await connection.execute(query, values);
    connection.end();

    res.status(200).json({ results: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// conexão criada por aqui: https://youtu.be/aprLiG34b50?t=532
