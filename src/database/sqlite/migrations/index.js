const sqliteConnection = require('../../sqlite');
const createUser = require('./createUser');

async function migrationsRun() {
  const schemas = [
    createUser
  ].join('');

  sqliteConnection()
    .then(db => db.exec(schemas))
    .catch(error => console.log(error));
};

module.exports = migrationsRun;