export default async function Call(req, res) {
  let authorizationValue;

  const { location, channel, user } = req.body;
  const newLocation = location;
  const newChannel = channel;
  const newUser = user;

  switch (newUser) {
    case "lepostiche":
      authorizationValue = process.env.NEXT_PUBLIC_LEPOSTICHE;
      break;
    case "lebes":
      authorizationValue = process.env.NEXT_PUBLIC_LEBES;
      break;
    case "viaveneto":
      authorizationValue = process.env.NEXT_PUBLIC_VIA;
      break;
    case "centauro":
      authorizationValue = process.env.NEXT_PUBLIC_CENTAURO;
      break;
    default:
      authorizationValue = process.env.NEXT_PUBLIC_LEBES;
  }

  try {
    console.log("stockApi4", req.body);

    const url = `https://production-inventory.omniplat.io/v1/clients/${newUser}/stocks?&channelId=${newChannel}&stock&locationId=${newLocation}&page=1&perpage=500`;
    const response = await fetch(url, {
      headers: new Headers({
        Authorization: authorizationValue,
        "Content-Type": "application/json",
      }),
    });

    const result = await response.json();
    res.status(200).json(result);
    console.log("stockApi5", result);
    console.log("stockApi6", url);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ocorreu um erro ao buscar os estoques." });
  }
};
