export default async function Call(req, res) {
  const { user, channel, status, orderId, fulfillmentId } = req.body;

  const newFulfillmentId = fulfillmentId;
  const newUser = user;
  const newChannel = channel;
  const newStatus = status;
  const newOrderId = orderId;
  const date = new Date();
  const formattedDate = date.toISOString();
  let authorizationValue;
  let urlNew;
  let newBody;

  switch (newStatus) {
    case "WILDCARD":
      urlNew = `https://homolog.omniplat.io/v1/clients/${newUser}/channels/${newChannel}/orders/${newOrderId}/fulfillments/${newFulfillmentId}/status/${newStatus}`;
      newBody = JSON.stringify({
        id: newFulfillmentId,
        orderId: newOrderId,
        channelId: newChannel,
        clientId: newUser,
        processedAt: formattedDate,
        status: newStatus,
      });
      break;
    case "BILLED":
      urlNew = `https://homolog.omniplat.io/v1/clients/${newUser}/channels/${newChannel}/orders/${newOrderId}/fulfillments/${newFulfillmentId}/status/${newStatus}`;
      newBody = JSON.stringify({
        id: newFulfillmentId,
        orderId: newOrderId,
        channelId: newChannel,
        clientId: newUser,
        operator: {
          id: "99",
          name: "OmniToolsOperator",
        },
        processedAt: formattedDate,
        status: newStatus,
        invoice: {
          processedAt: formattedDate,
          number: "123",
          id: "35170706347409002885550020000021941102100500",
          issueAt: formattedDate,
          nfe: {
            invoicePdf:
              "https://s3.amazonaws.com/production-omni-in-store-documents/invoicepdf.pdf",
            serialNumber: "2",
            authorizationProtocol: "135170449579655",
            observation: "Autorizado o uso da NF-e",
            eletronicKey: "35170706347409002885550020000021941102100500",
            operation: "VENDA A NAO CONTRIBUINTE",
            invoiceXml:
              "https://s3.amazonaws.com/production-omni-in-store-documents/F1/invoicexml.xml",
          },
        },
      });
      break;
    case "SEND_READY":
      urlNew = `https://homolog.omniplat.io/v1/clients/${newUser}/channels/${newChannel}/orders/${newOrderId}/fulfillments/${newFulfillmentId}`;
      newBody = JSON.stringify({
        id: newFulfillmentId,
        orderId: newOrderId,
        channelId: newChannel,
        clientId: newUser,
        processedAt: formattedDate,
        status: newStatus,
      });

    default:
      urlNew = `https://homolog.omniplat.io/v1/clients/${newUser}/channels/${newChannel}/orders/${newOrderId}/fulfillments/${newFulfillmentId}`;
      newBody = JSON.stringify({
        id: newFulfillmentId,
        orderId: newOrderId,
        channelId: newChannel,
        clientId: newUser,
        processedAt: formattedDate,
        status: newStatus,
      });
  }

  switch (newUser) {
    case "lepostiche":
      authorizationValue = process.env.NEXT_PUBLIC_HLG_LEPOSTICHE;
      break;
    case "lebes":
      authorizationValue = process.env.NEXT_PUBLIC_HLG_LEBES;
      break;
    case "viaveneto":
      authorizationValue = process.env.NEXT_PUBLIC_HLG_VIA;
      break;
    case "marisa":
      authorizationValue = process.env.NEXT_PUBLIC_HLG_MARISA;
      break;
    case "centauro":
      authorizationValue = process.env.NEXT_PUBLIC_HLG_CENTAURO;
      break;
    case "boticario":
      authorizationValue = process.env.NEXT_PUBLIC_HLG_BOTICARIO;
      break;
    case "restoque":
      authorizationValue = process.env.NEXT_PUBLIC_HLG_RESTOQUE;
      break;
    case "hering":
      authorizationValue = process.env.NEXT_PUBLIC_HLG_HERING;
      break;
    case "youcom":
      authorizationValue = process.env.NEXT_PUBLIC_HLG_YOUCOM;
      break;
    case "amc":
      authorizationValue = process.env.NEXT_PUBLIC_HLG_AMC;
      break;
    case "alpargatas":
      authorizationValue = process.env.NEXT_PUBLIC_HLG_ALPARGATAS;
      break;
    case "xiaomi":
      authorizationValue = process.env.NEXT_PUBLIC_HLG_XIAOMI;
      break;
    case "studiozcalcados":
      authorizationValue = process.env.NEXT_PUBLIC_HLG_STUDIOZCALCADOS;
      break;
    case "inbrands":
      authorizationValue = process.env.NEXT_PUBLIC_HLG_INBRANDS;
      break;
    case "schumann":
      authorizationValue = process.env.NEXT_PUBLIC_HLG_SCHUMANN;
      break;
    case "tokstok":
      authorizationValue = process.env.NEXT_PUBLIC_HLG_TOKSTOK;
      break;
    case "lamoda":
      authorizationValue = process.env.NEXT_PUBLIC_HLG_LAMODA;
      break;
    case "lunelli":
      authorizationValue = process.env.NEXT_PUBLIC_HLG_LUNELLI;
      break;
    case "samsonite":
      authorizationValue = process.env.NEXT_PUBLIC_HLG_SAMSONITE;
      break;
    case "farmelhor":
      authorizationValue = process.env.NEXT_PUBLIC_HLG_FARMELHOR;
      break;
    case "luizabarcelos":
      authorizationValue = process.env.NEXT_PUBLIC_HLG_LUIZA;
      break;
    case "bemol":
      authorizationValue = process.env.NEXT_PUBLIC_HLG_BEMOL;
      break;
    default:
      authorizationValue = process.env.NEXT_PUBLIC_HLG_LEBES;
  }

  try {
    const url = urlNew;
    console.log(url);

    const response = await fetch(url, {
      headers: new Headers({
        Authorization: authorizationValue,
        "Content-Type": "application/json",
        Accept: "*/*",
      }),
      body: newBody,
      method: "PUT",
    });

    console.log({ url });
    console.log(authorizationValue);
    console.log(newBody);

    if (response.status === 204) {
      //res.status(204).end();
      res
        .status(200)
        .json({
          message: "Status changed successfully",
          statusChangedTo: newStatus,
        });
    } else {
      const result = await response.json();
      res.status(200).json(result);
    }

    console.log(url);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Ocorreu um erro ao salvar ou modificar o status",
      error: error.message,
    });
  }
}
