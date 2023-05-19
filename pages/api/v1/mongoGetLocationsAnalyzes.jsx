import client from "../../../mongoconnection";

export default async function handler(req, res) {
  const collection = client.db("omnitools").collection("omsLocations");

  try {
    const distinctClientIds = await collection.distinct("clientId");

    res.status(200).json({ clientIds: distinctClientIds });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}