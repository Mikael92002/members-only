const { Client } = require("pg");
const bcrypt = require("bcryptjs");

const seedStatement = async () => {
  try {
    const hashedPassword = await bcrypt.hash("123", 10);
    const SQL = `
DROP TABLE IF EXISTS messages;
DROP TABLE  IF EXISTS users;

CREATE TABLE users (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
username VARCHAR(40) NOT NULL,
is_member BOOLEAN DEFAULT FALSE NOT NULL,
password VARCHAR(255) NOT NULL
);

CREATE TABLE messages(
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
user_id INTEGER,
message VARCHAR(500),
message_date TIMESTAMPTZ,
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

INSERT INTO users(username, is_member, password)
VALUES('mikky', FALSE, '${hashedPassword}');

INSERT INTO messages(user_id, message, message_date)
VALUES
(1, 'Testing testing 123', '2025-01-18 14:30:15'),
(1, 'waka waka ay ay', '2025-02-01 00:20:00');
`;
    return SQL;
  } catch (err) {
    throw err;
  }
};

async function main() {
  console.log("seeding...");
  const clientConfig = process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
      }
    : {
        connectionString: `postgresql://${process.env.USER}:${process.env.PW}@${process.env.HOST}:${process.env.DB_PORT}/${process.env.DB}`,
      };
  const client = new Client(clientConfig);
  await client.connect();
  await client.query(await seedStatement());
  await client.end();
  console.log("done");
}

main();
