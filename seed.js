//const { noExtendLeft } = require('sequelize/types/lib/operators');
const {db, Page, User} = require('./models/index');

const seed = async function() {
  try {
    await db.sync();
  }
  catch(error) {
    console.error('An error occurred');
    await db.close();
  }
}

module.exports = seed;
