export default async (req, res) => {
  let authorizationValue;

  const { location, channel, user } = req.body;

  const locationId = req.body.location;
  const channelId = req.body.channel;
  const userId = req.body.user;

  console.log("stockApi0", req.body);
  // console.log("stockApi1", locationId);
  // console.log("stockApi2", channelId);
  // console.log("stockApi3", userId);

  switch (userId) {
    case "lepostiche":
      authorizationValue = process.env.NEXT_PUBLIC_LEPOSTICHE;
      // authorizationValue =
      //   "Basic bGVwb3N0aWNoZTpmMWY0ZTMwYWNlZjY0YmQwZDM0NmIwNTBlNzMyODllNw==";
      break;
    case "lebes":
      authorizationValue = process.env.NEXT_PUBLIC_LEBES;
      break;
    case "viaveneto":
      authorizationValue = process.env.NEXT_PUBLIC_VIA;
      break;
    case "vago":
      authorizationValue = process.env.NEXT_PUBLIC_LEBES;
      break;
    default:
      authorizationValue = process.env.NEXT_PUBLIC_LEBES;
  }

  try {
    // console.log("stockApi4", req.body);

    const url = `https://production-inventory.omniplat.io/v1/clients/${userId}/stocks?&channelId=${channelId}&stock&locationId=${locationId}&page=1&perpage=500`;
    const response = await fetch(url, {
      headers: new Headers({
        Authorization: authorizationValue,
        "Content-Type": "application/json",
      }),
    });

    const result = await response.json();
    res.status(200).json(result);

    // console.log("stockApi6", url);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ocorreu um erro ao buscar os estoques." });
  }
};
