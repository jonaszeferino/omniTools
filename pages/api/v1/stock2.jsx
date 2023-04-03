export default async (req, res) => {
  const { location, channel, user } = req.body;

  const url = `https://production-inventory.omniplat.io/v1/clients/lepostiche/stocks?&channelId=site&stock&locationId=190410&page=1&perpage=500`;

  let authorizationValue =
    "Basic bGVwb3N0aWNoZTpmMWY0ZTMwYWNlZjY0YmQwZDM0NmIwNTBlNzMyODllNw==";

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
