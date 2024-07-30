/* eslint-disable @typescript-eslint/no-explicit-any */
import Postgrator from "postgrator";
import pg from "pg";
import path from "path";


async function main() {
  let client: pg.Client | null = null;
  try {
    client = new pg.Client({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });

    if (client === null) throw new Error("Client creation Error");

    await client.connect();
    const postgrator = new Postgrator({
      migrationPattern: path.join(__dirname, "..", "migrations/*"),
      driver: "pg",
      database: process.env.DB_NAME,
      schemaTable: "migrations",
      execQuery: (query: any) => client ? client.query(query) : null,
    });

    const appliedMigrations = await postgrator.migrate();
    console.log(appliedMigrations);
  } catch (error: any) {
    console.error("error", error);
    process.exit(1);
  }
  if (client !== null) await client.end();
}
main();