
const express = require('express');
const app = express();
const morgan = require('morgan');
const layout = require('./views/layout')
const { db, Page, User } = require('./models');
const usersRoutes = require('./routes/users')
const wikiRoutes = require('./routes/wiki')
//const seed = require('./seed');

db.authenticate()
  .then(() => {
    console.log('connected to the database');
  })

const publicMiddleware = express.static(__dirname + './public');
app.use(publicMiddleware);
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/wiki', wikiRoutes)

app.get('/', (req, res) => {
  res.redirect('/wiki');
})

//seed();
const seed = async function() {
try {
  await Page.sync();
  await User.sync();
}
catch(error) {
  console.error('An error occurred');
  await db.close();
}
}
seed();
const PORT = 1337;
app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
})
