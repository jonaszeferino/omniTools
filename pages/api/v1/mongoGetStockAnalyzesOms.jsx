import client from "../../../mongoconnection";

export default async function handler(req, res) {
  const collection = client.db("omnitools").collection("omsStock");

  try {
    const query = [
      {
        $group: {
          _id: "$viewName",
          clientIdCommerce: { $first: "$clientIdOms" },
          createdDate: { $first: "$createdDate" },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          viewName: "$_id",
          clientIdOms: 1,
          createdDate: 1,
          count: 1
        }
      },
      { $sort: { createdDate: -1 } },
      { $limit: 30 }
    ];

    const data = await collection.aggregate(query).toArray();

    res.status(200).json({ results: data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

