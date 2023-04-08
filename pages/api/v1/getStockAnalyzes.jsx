import { connectionRdsMySql } from "../../../components/connectiondb";

export default async function handler(req, res) {
  const connection = await connectionRdsMySql();

  try {
    const query = "SELECT DISTINCT viewName, clientIdOms, DATE_FORMAT(CreatedDate, '%Y-%m-%d %H:%i') as createdDate FROM stock_channel_oms ORDER BY createdDate DESC LIMIT 30;"
                  //"SELECT DISTINCT viewName, clientIdOms, DATE(CreatedDate) as createdDate FROM stock_channel_oms ORDER BY createdDate DESC LIMIT 30;";

    console.log('aqui', query)
    const values = [];
    const [data] = await connection.execute(query, values);
    connection.end();

    res.status(200).json({ results: data });
    console.log("aqui", data)
  } catch (error) {
    res.status(500).json({ error: error.message });
    
  }
}

// conexão criada por aqui: https://youtu.be/aprLiG34b50?t=532
