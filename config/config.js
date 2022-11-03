module.exports = {

  development: {
    username: "kety",
    password: "Rahasia01",
    database: "simple-login-with-google",
    host: "127.0.0.1",
    dialect: "postgres"
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: DB_NAME,
    host: process.env.DB_HOST,
    dialect: "Postgres"
    dialectOptions : {
      ssl: {
        rejectUnauthorized: false
      }
    }
  }
}

