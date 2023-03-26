import mysql from "mysql2/promise";

const dbConfig = {
  host: "omnitools.cluster-cnc10a6gbp2t.us-east-2.rds.amazonaws.com",
  port: "3306",
  user: "admin",
  password: "LinxOmniTools2023",
  database: "omnitools",
  connectionLimit: 10,
  queueLimit: 0,
};

export async function getConnection() {
  const connection = await mysql.createConnection(dbConfig);
  return connection;
}
