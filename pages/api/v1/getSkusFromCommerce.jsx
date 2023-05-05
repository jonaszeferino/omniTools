
  export default async function Call(req, res) {
 const { skus, userCommerce } = req.body;
 let newUser = userCommerce;
 let arraySku = skus
 console.log(arraySku);
 console.log(newUser);
 let test = "4000211001441"
  //${newUser}

 try {
   const url = `https://${newUser}.layer.core.dcg.com.br/v1/Catalog/API.svc/web/GetSKUsByIntegrationID`;
   const body = JSON.stringify(arraySku);
   
   console.log("body", body);
   
   const response = await fetch(url, {
     headers: new Headers({
       Authorization: process.env.NEXT_PUBLIC_COMMERCE,
       "Content-Type": "application/json",
       Accept: "application/json",
     }),
     
     body: body,
     method: "POST",
     
   });

   const result = await response.json();
   res.status(200).json(result);
   console.log(result);
   console.log(url);
 } catch (error) {
   console.error(error);
   res.status(500).json({ message: "Ocorreu um erro ao buscar os SKUS" });
 }
};

//pra saber qual o productid de cada sku:
//https://leposticheoms.layer.core.dcg.com.br/reference.html?url=/swagger.json#!/Catalog/GetSKUsByIntegrationID
//https://leposticheoms.layer.core.dcg.com.br/v1/Catalog/API.svc/web/GetSKUsByIntegrationID
