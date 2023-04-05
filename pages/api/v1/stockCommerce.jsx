export default async (req, res) => {
  const { channel, user, availability } = req.body;
  // const newChannel = channel;
  // const newSku = sku;
  // let newAvailability = "I";
  let newUser = user;
  let newChannel = channel;
  let newSku = 20624;
  let newAvailability = availability;

  try {
    console.log("stockApi1", req.body);

    let whereClause;
    if (availability === "I" || availability === "O") {
      whereClause = `WarehouseId == ${newChannel} && availability == "${newAvailability}"`;
    } else {
      whereClause = `WarehouseId == ${newChannel}`;
    }
    const url = `https://${newUser}.layer.core.dcg.com.br/v1/Inventory/API.svc/web/SearchInventorySKU`;
    const response = await fetch(url, {
      headers: new Headers({
        // BasicAuthorization: process.env.NEXT_PUBLIC_COMMERCE,
        Authorization: process.env.NEXT_PUBLIC_COMMERCE,
        "Content-Type": "application/json",
        "access-control-allow-origin": "*",
        Accept: "application/json",
      }),
      body: JSON.stringify({
        Page: {
          PageIndex: 0,
          PageSize: 200,
        },
        // Where: `ProductID == ${newSku} && WarehouseId == ${newChannel}` por productid,
        // Where: `WarehouseId == ${newChannel} && availability == "${newAvailability}"`,
        // Where: whereTeste,
        Where: whereClause,
      }),
      method: "POST",
    });

    const result = await response.json();
    res.status(200).json(result);
    console.log("stockApi2", result);
    console.log("stockApi3", url);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ocorreu um erro ao buscar os estoques." });
  }
};

//pra saber qual o productid de cada sku:
//https://leposticheoms.layer.core.dcg.com.br/reference.html?url=/swagger.json#!/Catalog/GetSKUsByIntegrationID
