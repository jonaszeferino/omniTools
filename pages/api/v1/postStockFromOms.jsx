import { connectionRdsMySql } from "../../../components/connectiondb";
export default async function handler(req, res) {
  const connection = await connectionRdsMySql();
  
  try {
    const { stockData } = req.body;
    console.log(req.body);
    console.log(stockData);

    const query =
      "INSERT INTO stock_channel_oms (clientIdOms, locationId, stockType, totalQuantity, balance, updatedAt, enabled, viewId, viewName, skuId, createdDate ) VALUES (?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?)";

    for (const stock of stockData) {
      const values = [
        stock.clientIdOms,
        stock.locationId,
        stock.stockType,
        stock.totalQuantity,
        stock.balance,
        stock.updatedAt,
        stock.enabled,
        stock.viewId,
        stock.viewName,
        stock.skuId,
        stock.createdDate
        
      ];

      const [result] = await connection.execute(query, values);
    }

    connection.end();

    res.status(200).json({ message: "Dados inseridos com sucesso." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}




