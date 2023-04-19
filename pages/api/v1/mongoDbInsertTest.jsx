import  client  from "../../../mongoconnection"

export default async function handler(req, res) {
  const collection = client.db("omnitools").collection("commerceSkus");

  switch (req.method) {
    case "POST":
      const body = JSON.parse(req.body);
      console.log(body)
      const inPutMongo = await collection.insertOne(body); // iserir azar
      res.json({
        status: 'Teste Salvo Com Sucesso',
        statusCode:200,
        data: inPutMongo,
      });
      break;

    default:
      break;
  }
}