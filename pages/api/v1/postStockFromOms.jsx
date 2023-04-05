import { connectionRdsMySql } from "../../../components/connectiondb";

export default async function handler(req, res) {
  const connection = await connectionRdsMySql();

  try {
    const { stockData } = req.body;

    const query =
      "INSERT INTO stock_channel_oms (clientId_oms, locationId, stockType, totalQuantity, balance, updatedAt, enabled, view_id, view_name, sku_id ) VALUES (?, ?, ?, ?, ?,?, ?, ?, ?, ?)";

    for (const stock of stockData) {
      const values = [
        stock.clientId_oms,
        stock.locationId,
        stock.stockType,
        stock.totalQuantity,
        stock.balance,
        stock.updatedAt,
        stock.enabled,
        stock.view_id,
        stock.view_name,
        stock.sku_id,
        
      ];

      const [result] = await connection.execute(query, values);
    }

    connection.end();

    res.status(200).json({ message: "Dados inseridos com sucesso." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


