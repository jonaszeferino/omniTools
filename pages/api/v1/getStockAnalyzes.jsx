import { connectionRdsMySql } from "../../../components/connectiondb";

export default async function handler(req, res) {
  const connection = await connectionRdsMySql();

  try {
    const query = "SELECT DISTINCT view_name, clientId_oms, DATE(created_at) as created_date FROM stock_channel_oms";
    
    const values = [];
    const [data] = await connection.execute(query, values);
    connection.end();

    res.status(200).json({ results: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// conexão criada por aqui: https://youtu.be/aprLiG34b50?t=532
