import mysql from "mysql2/promise";

const dbConfig = {
  host: "omnitools.cluster-cnc10a6gbp2t.us-east-2.rds.amazonaws.com",
  port: "3306",
  user: "admin",
  password: process.env.NEXT_PUBLIC_RDS_MY_SQL,
  database: "omnitools",
  connectionLimit: 10,
  queueLimit: 0,
};

export async function connectionRdsMySql() {
  const connection = await mysql.createConnection(dbConfig);
  return connection;
}
