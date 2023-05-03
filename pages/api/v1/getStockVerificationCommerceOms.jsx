import { connectionRdsMySql } from "../../../components/connectiondb";

export default async function handler(req, res) {
  const connection = await connectionRdsMySql();
  
  const { omsAnalysis, commerceAnalysis } = req.body;

  console.log(req.body)
  console.log(omsAnalysis)
  console.log(commerceAnalysis)

  const newOmsAnalysis = omsAnalysis;
  const newCommerceAnalysis = commerceAnalysis;

  console.log(newOmsAnalysis)
  console.log(newCommerceAnalysis)
    

  try {
    const query = `SELECT distinct 
    sc.sku, 
    scc.StockBalance AS BalanceCommerce, 
    scc.viewName AS commerceViewName, 
    oms.balance AS balanceOMS, 
    oms.viewName AS omsViewName
    FROM sku_commerce sc 
    JOIN stock_channel_commerce scc ON sc.productId = scc.ProductID 
    JOIN (
       SELECT skuId, SUM(balance) AS balance, viewName
       FROM stock_channel_oms
       WHERE viewName = '${newOmsAnalysis}'
       GROUP BY skuId, viewName) 
    oms ON oms.skuId = sc.sku
    WHERE scc.viewName = '${newCommerceAnalysis}'`

    console.log('aqui', query)
    const values = [];
    const [data] = await connection.execute(query, values);
    connection.end();

    res.status(200).json({ results: data });
    console.log("aqui", data)
  } catch (error) {
    res.status(500).json({ error: error.message });
    
  }
}

// conexão criada por aqui: https://youtu.be/aprLiG34b50?t=532
// correção abaixo, na tabela do commerce temos apenas 1 linha do OMS 1 por location, então o SUM está apenas no OMS
// além disso está sendo alimentado não a prop stockbalance no oms na inserçõa, mas o availableQuantity


// SELECT distinct 
//        sc.sku, 
//        scc.StockBalance AS BalanceCommerce, 
//        scc.viewName AS commerceViewName, 
//        oms.balance AS balanceOMS, 
//        oms.viewName AS omsViewName
// FROM sku_commerce sc 
// JOIN stock_channel_commerce scc ON sc.productId = scc.ProductID 
// JOIN (
//   SELECT skuId, SUM(balance) AS balance, viewName
//   FROM stock_channel_oms
//   WHERE viewName = 'stock_oms_30_04_23'
//   GROUP BY skuId, viewName
// ) oms ON oms.skuId = sc.sku
// WHERE scc.viewName = 'stock_commerce_30_04_23'
