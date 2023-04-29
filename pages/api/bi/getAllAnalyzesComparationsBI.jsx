import { connectionRdsMySql } from "../../../components/connectiondb";

export default async function handler(req, res) {
  const connection = await connectionRdsMySql();

  try {
    const query = `select DISTINCT sc.sku, scc.StockBalance as BalanceCommerce, scc.viewName, sco.balance  as balanceOMS, sco.viewName from sku_commerce sc  JOIN stock_channel_commerce scc on sc.productId  = scc.ProductID JOIN stock_channel_oms sco on sco.skuId = sc.sku  where sco.viewName = 'analise_20_04_lepostiche' and scc.viewName = 'teste_20_04_23'`
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
