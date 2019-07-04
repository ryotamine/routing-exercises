require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: 'express_users',
      user: 'labber',
      password: 'labber'
    },
    migrations: {
      directory: './migrations'
    },
    useNullAsDefault: true
  }
};
