// funcionando com o limite de  1mb na api
import { connectionRdsMySql } from "../../../components/connectiondb";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
};

export default async function handler(req, res) {
  const connection = await connectionRdsMySql();

  try {
    const { dataToSend } = req.body;
    console.log(req.body);
    console.log(dataToSend);
    
    const query =
      "INSERT INTO sku_commerce (productId, integrationId, name, sku, ean, clientId) VALUES (?, ?, ?, ?, ?, ?)";

    for (const dataSend of dataToSend) {
      const values = [
        dataSend.productId ? dataSend.productId : 'productIdPadrao',
        dataSend.integrationId ? dataSend.integrationId : 'integrationIdPadrao',
        dataSend.name ? dataSend.name : 'NamePadrao',
        dataSend.sku ? dataSend.sku : 'SKUPadrao',
        dataSend.ean ? dataSend.ean : 'EANPadrao',
        dataSend.clientId ? dataSend.clientId : 'ClientIdPadrao'
      ];

      const [result] = await connection.execute(query, values);
    }

    connection.end();
    res.status(200).json({ message: "Dados inseridos com sucesso." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// export default async function handler(req, res) {
//   const connection = await connectionRdsMySql();

//   try {
//     const { dataToSend } = req.body;
//     console.log(req.body);
//     console.log(dataToSend);
    
//     const query =
//       "INSERT INTO sku_commerce (productId, integrationId, name, sku, ean, clientId) VALUES (?, ?, ?, ?, ?, ?)";

//     for (const dataSend of dataToSend) {
//       const values = [
//         dataSend.productId ? dataSend.productId : 'productIdPadrao',
//         dataSend.integrationId ? dataSend.integrationId : 'integrationIdPadrao',
//         dataSend.name ? dataSend.name : 'NamePadrao',
//         dataSend.sku ? dataSend.sku : 'SKUPadrao',
//         dataSend.ean ? dataSend.ean : 'EANPadrao',
//         dataSend.clientId ? dataSend.clientId : 'ClientIdPadrao'
//       ];

//       const [result] = await connection.execute(query, values);
//     }

//     connection.end();
//     res.status(200).json({ message: "Dados inseridos com sucesso." });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }




