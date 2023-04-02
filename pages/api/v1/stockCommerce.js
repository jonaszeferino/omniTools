export default async (req, res) => {
  const { channel, sku } = req.body;
  // const newChannel = channel;
  // const newSku = sku;
  let newChannel = 2;
  let newSku = 20624;

  try {
    console.log("stockApi1", req.body);

    const url = `https://leposticheoms.layer.core.dcg.com.br/v1/Inventory/API.svc/web/SearchInventorySKU`;
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
          PageSize: 100,
        },
        // Where: `ProductID == ${newSku} && WarehouseId == ${newChannel}`,
        Where: `WarehouseId == ${newChannel}`,
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
