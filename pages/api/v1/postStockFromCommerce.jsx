import { connectionRdsMySql } from "../../../components/connectiondb";
export default async function handler(req, res) {
  const connection = await connectionRdsMySql();

  try {
    const { stockData } = req.body;
    console.log(req.body);
    console.log(stockData);
    
    const query =
      "INSERT INTO stock_channel_commerce (clientIdCommerce,ProductID,sku,OutStockHandlingDays,totalQuantity,StockBalance,StockReserved,WarehouseID,WarehouseName,availability,createdDate,viewName) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)";

    for (const stock of stockData) {
      const values = [
        stock.clientIdCommerce ? stock.clientIdCommerce : null,
        stock.ProductID ? stock.ProductID : null,
        stock.sku ? stock.sku : null,
        stock.OutStockHandlingDays ? stock.OutStockHandlingDays : 0,
        stock.totalQuantity ? stock.totalQuantity : 0,
        stock.StockBalance ? stock.StockBalance : 0,
        stock.StockReserved ? stock.StockReserved : 0,
        stock.WarehouseID ? stock.WarehouseID :  null,
        stock.WarehouseName ? stock.WarehouseName : null,
        stock.availability ? stock.availability : 0,
        stock.createdDate ? stock.createdDate : null,
        stock.viewName ? stock.viewName : null,
            ];

      const [result] = await connection.execute(query, values);
    }
    connection.end();
   res.status(200).json({ message: "Dados inseridos com sucesso." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}




