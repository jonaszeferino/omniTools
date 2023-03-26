import { values } from "lodash";
import mysql from "mysql2/promise";

export default async function handler(req, res) {
  const dbconnection = await mysql.createConnection({
    host: "omnitools.cluster-cnc10a6gbp2t.us-east-2.rds.amazonaws.com",
    port: "3306",
    user: "admin",
    password: "LinxOmniTools2023",
    database: "omnitools",
    connectionLimit: 10,
    queueLimit: 0,
  });

  try {
    const query = "SELECT username, password, email FROM users";
    const values = [];
    const [data] = await dbconnection.execute(query, values);
    dbconnection.end();

    res.status(200).json({ results: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// conexão criada por aqui: https://youtu.be/aprLiG34b50?t=532
