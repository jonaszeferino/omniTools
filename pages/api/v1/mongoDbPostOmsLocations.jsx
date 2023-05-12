import client from "../../../mongoconnection";

export default async function handler(req, res) {
  const collection = client.db("omnitools").collection("omsLocations");

  switch (req.method) {
    case "POST":
      const stockData = req.body.stockData;
      console.log(stockData); 
      const inPutMongo = await collection.insertMany(stockData);

      res.json({
        status: "Salvo Com Sucesso",
        statusCode: 200,
        data: inPutMongo,
      });

      break;

    default:
      break;
  }
}