const { Client } = require("pg");
const fs = require("fs");
const path = require("path");
const dns = require("dns");

const PROJECT_REF = "dveuhzrjaryziwnxojvg";
const DB_HOST = `db.${PROJECT_REF}.supabase.co`;

async function runMigrations() {
  const addresses = await new Promise((resolve, reject) => {
    dns.resolve6(DB_HOST, (err, addrs) => {
      if (err) reject(err);
      else resolve(addrs);
    });
  });
  const ipv6 = addresses[0];

  // Try different pooler configurations
  const configs = [
    // Direct via IPv6 + pooler port
    { host: ipv6, port: 6543, user: "postgres" },
    { host: ipv6, port: 6543, user: `postgres.${PROJECT_REF}` },
    { host: ipv6, port: 5432, user: "postgres" },
    { host: ipv6, port: 5432, user: `postgres.${PROJECT_REF}` },
  ];

  for (const cfg of configs) {
    const client = new Client({
      ...cfg,
      password: "Naseer@5727",
      database: "postgres",
      ssl: { rejectUnauthorized: false, servername: DB_HOST },
      connectionTimeoutMillis: 8000,
    });

    try {
      console.log(` Trying ${cfg.user}@${cfg.host}:${cfg.port}...`);
      await client.connect();
      console.log(" Connected!\n");

      const sqlPath = path.join(__dirname, "..", "supabase", "migration-combined.sql");
      const sql = fs.readFileSync(sqlPath, "utf-8");

      console.log(" Running migration...");
      await client.query(sql);
      console.log(" Migrations applied!\n");

      const { rows: tables } = await client.query(
        "SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_name IN ('words','practice_sessions')"
      );
      console.log(" Tables:", tables.map((r) => r.table_name).join(", "));

      await client.end();
      console.log("\n Done! Now run: npm run seed");
      return;
    } catch (err) {
      console.log(`   - ${err.message}`);
    }
  }

  console.log("\n All connection attempts failed.");
  console.log(" Please paste the SQL at:");
  console.log(` https://supabase.com/dashboard/project/${PROJECT_REF}/sql/new`);
  process.exit(1);
}

runMigrations();
