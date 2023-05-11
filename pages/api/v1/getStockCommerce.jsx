export default async function Call(req, res) {
   const { channel, user, availability, page } = req.body;
  // const newChannel = "site";
  // const newUser = "leposticheoms";
  // const newAvailability = "I";
  // let newSku = 20624;
  let newUser = user;
  let newChannel = channel;
  let newAvailability = availability;
  let newPage = page;

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
        Authorization: process.env.NEXT_PUBLIC_COMMERCE,
        "Content-Type": "application/json",
        "access-control-allow-origin": "*",
        Accept: "application/json",
      }),
      body: JSON.stringify({
        Page: {
          PageIndex: newPage,
          PageSize: 500
        },
        // Where: `ProductID == ${newSku} && WarehouseId == ${newChannel}` por productid,
        // Where: `WarehouseId == ${newChannel} && availability == "${newAvailability}"`,
        // Where: whereTeste,
        Where: whereClause,
        
      }),
      method: "POST",

    });
    console.log(JSON.stringify({
      Page: {
        PageIndex: 0,
        PageSize: 500
      },
      Where: whereClause,
    }));

    

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
