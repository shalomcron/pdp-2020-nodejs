var express = require('express');
var router = express.Router();
var articles = require('../db/articles');

router.get('/', (req, res) => {
    articles.find().then((result) => {
        console.log("articles.find result", result);
        res.send(result);
    }, function(err) {
        console.log('articles.find ERR', err);
    });
});

router.get('/agg', (req, res) => {
    articles.aggragatedFind().then((result) => {
        res.send({articles: result});
    }, function(err) {
        console.log('articles.find ERR', err);
    });
});

module.exports = router;
