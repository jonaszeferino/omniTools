export default async (req, res) => {
  // const stockUser = req.query.stockUser;
  // const stockChannel = req.query.stockChannel;
  // const stockLocation = req.query.stockLocation;
  const url = `https://production-inventory.omniplat.io/v1/clients/lepostiche/stocks?&channelId=site&stock&locationId=190410&page=1&perpage=500`;

  let authorizationValue =
    "Basic bGVwb3N0aWNoZTpmMWY0ZTMwYWNlZjY0YmQwZDM0NmIwNTBlNzMyODllNw==";

  // switch (stockUser) {
  //   case "lepostiche":
  //     authorizationValue = process.env.NEXT_PUBLIC_LEPOSTICHE;
  //     break;
  //   case "lebes":
  //     authorizationValue = process.env.NEXT_PUBLIC_LEBES;
  //     break;
  //   case "viaveneto":
  //     authorizationValue = process.env.NEXT_PUBLIC_VIA;
  //     break;
  //   case "vago":
  //     authorizationValue = process.env.NEXT_PUBLIC_LEBES;
  //     break;
  //   default:
  //     authorizationValue = process.env.NEXT_PUBLIC_LEBES;
  // }

  try {
    const response = await fetch(url, {
      headers: new Headers({
        Authorization: authorizationValue,
        "Content-Type": "application/json",
      }),
    });

    const result = await response.json();
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ocorreu um erro ao buscar os estoques." });
  }
};
