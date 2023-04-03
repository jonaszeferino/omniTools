import { connectionRdsMySql } from "../../../components/connectiondb";

export default async function handler(req, res) {
  const connection = await connectionRdsMySql();

  try {
    const { username, password, email, full_name } = req.body;

    const query =
      "INSERT INTO users (username, password, email, full_name) VALUES (?, ?, ?, ?)";
    const values = [username, password, email, full_name];

    const [result] = await connection.execute(query, values);
    connection.end();

    res.status(200).json({ message: "Dados inseridos com sucesso." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
