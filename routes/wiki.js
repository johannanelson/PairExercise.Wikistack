const express = require('express');
const router = express.Router();
const { Page } = require('../models')
const { addPage } = require('../views');

router.get('/', async (req, res, next) =>{
  try {
    res.send('got to /wiki')
  }
  catch(error){
    next(error)
  }
})

router.post('/add', async (req, res, next) => {
  const authorName = req.body.authorName;
  const authorEmail = req.body.authorEmail;
  const title = req.body.title;
  const content = req.body.content;
  const status = req.body.status;

  try {
    //console.log(req.body);
    //res.json(req.body);
    const page = await Page.create( {
      title: title,
      slug: title,
      content: content,
      status: status,
    });
    await page.save();
    //res.redirect('/');
  }
  catch(error){
    next(error)
  }
})

router.get('/add', async (req, res, next) => {
  try {
    res.send(addPage());
  }
  catch(error){
    next(error)
  }
})

module.exports = router;
