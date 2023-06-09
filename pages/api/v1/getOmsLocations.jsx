export default async function Call(req, res) {
  let authorizationValue;

  const { user, page } = req.body;
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
    case "marisa":
        authorizationValue = process.env.NEXT_PUBLIC_MARISA;
        break;
    case "centauro":
        authorizationValue = process.env.NEXT_PUBLIC_CENTAURO;
        break;
    case "boticario":
        authorizationValue = process.env.NEXT_PUBLIC_BOTICARIO;
        break;    
    case "restoque":
        authorizationValue = process.env.NEXT_PUBLIC_RESTOQUE;
        break;
    case "hering":
        authorizationValue = process.env.NEXT_PUBLIC_HERING;
        break;    
    case "youcom":
        authorizationValue = process.env.NEXT_PUBLIC_YOUCOM;
        break;
    case "amc":
        authorizationValue = process.env.NEXT_PUBLIC_AMC;
        break;
    case "alpargatas":
        authorizationValue = process.env.NEXT_PUBLIC_ALPARGATAS;
        break;
    case "xiaomi":
        authorizationValue = process.env.NEXT_PUBLIC_XIAOMI;
        break;
    case "studiozcalcados":
        authorizationValue = process.env.NEXT_PUBLIC_STUDIOZCALCADOS;
        break;
    case "inbrands":
        authorizationValue = process.env.NEXT_PUBLIC_INBRANDS;
        break;        
    case "schumann":
        authorizationValue = process.env.NEXT_PUBLIC_SCHUMANN;
        break;
    case "tokstok":
        authorizationValue = process.env.NEXT_PUBLIC_TOKSTOK;
        break;
    case "lamoda":
        authorizationValue = process.env.NEXT_PUBLIC_LAMODA;
        break;   
    case "lunelli":
        authorizationValue = process.env.NEXT_PUBLIC_LUNELLI;
        break;   
    case "samsonite":
        authorizationValue = process.env.NEXT_PUBLIC_SAMSONITE;
        break;
    case "farmelhor":
        authorizationValue = process.env.NEXT_PUBLIC_FARMELHOR;
        break;
    case "luizabarcelos":
          authorizationValue = process.env.NEXT_PUBLIC_LUIZA;
          break;
    default:
      authorizationValue = process.env.NEXT_PUBLIC_LEBES;
  }


  try {
    console.log("stockApi4", req.body);

    //const url = `https://production-inventory.omniplat.io/v1/clients/${newUser}/stocks?&channelId=${newChannel}&stock&locationId=${newLocation}&page=1&perpage=500`;
    const url = `https://hub.omniplat.io/v1/clients/${newUser}/locations?page=${page}&perpage=500`
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
