import { connectionRdsMySql } from "../../../components/connectiondb";

export default async function handler(req, res) {
  const connection = await connectionRdsMySql();

  try {
    const { stockData } = req.body;

    const query =
      "INSERT INTO stock_channel_commerce (clientIdCommerce,ProductID,sku,OutStockHandlingDays,totalQuantity,StockBalance,StockReserved,WarehouseID,WarehouseName,availability) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    for (const stock of stockData) {
      const values = [
        stock.clientIdCommerce,
        stock.ProductID,
        stock.sku,
        stock.OutStockHandlingDays,
        stock.totalQuantity,
        stock.StockBalance,
        stock.StockReserved,
        stock.WarehouseID,
        stock.WarehouseName,
        stock.availability,
        
        
      ];

      const [result] = await connection.execute(query, values);
    }

    connection.end();

    res.status(200).json({ message: "Dados inseridos com sucesso." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}




