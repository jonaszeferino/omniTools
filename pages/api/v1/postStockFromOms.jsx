import { connectionRdsMySql } from "../../../components/connectiondb";

export default async function handler(req, res) {
  const connection = await connectionRdsMySql();

  try {
    const { stockData } = req.body;

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

// import { connectionRdsMySql } from "../../../components/connectiondb";

// export default async function handler(req, res) {
//   const connection = await connectionRdsMySql();

//   try {
//     const { stockData } = req.body;

//     const query =
//       "INSERT INTO stock_channel_oms (clientIdOms, locationId, stockType, totalQuantity, balance, updatedAt, enabled, viewId, viewName, skuId ) VALUES (?, ?, ?, ?, ?,?, ?, ?, ?, ?)";

//     const existingRecords = {};

//     for (const stock of stockData) {
//       const checkQuery = "SELECT DISTINCT clientIdOms, viewName FROM stock_channel_oms WHERE clientIdOms = ? AND viewName = ?";
//       const checkValues = [stock.clientIdOms, stock.viewName];
//       const [checkResult] = await connection.execute(checkQuery, checkValues);

//       if (checkResult.length > 0) {
//         const { clientIdOms, viewName } = checkResult[0];
//         existingRecords[`${clientIdOms}-${viewName}`] = true;
//         console.log('aqui',existingRecords)
//       } else {
//         const values = [
//           stock.clientIdOms,
//           stock.locationId,
//           stock.stockType,
//           stock.totalQuantity,
//           stock.balance,
//           stock.updatedAt,
//           stock.enabled,
//           stock.viewId,
//           stock.viewName,
//           stock.skuId,
//         ];

//         const [result] = await connection.execute(query, values);
//       }
//     }

//     connection.end();

//     if (Object.keys(existingRecords).length > 0) {
//       const existingRecordsString = Object.keys(existingRecords).join(", ");
//       const errorMessage = `Os registros com clientIdOms e viewName: ${existingRecordsString} já existem.`;
//       throw new Error(errorMessage);
//     }

//     res.status(200).json({ message: "Dados inseridos com sucesso." });
//    } catch (error) {
//      res.status(500).json({ error: error.message });
//    }
//  }


