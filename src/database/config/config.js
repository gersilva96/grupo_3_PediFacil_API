module.exports = {
  "development": {
    "username": "USER",
    "password": "PASSWORD",
    "database": "pedifacil",
    "host": `${process.env.DB_HOST}`,
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": `${process.env.DB_HOST}`,
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": `${process.env.DB_HOST}`,
    "dialect": "mysql"
  }
}
