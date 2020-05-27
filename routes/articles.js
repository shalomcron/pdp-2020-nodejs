var express = require('express');
var router = express.Router();
var articles = require('../db/articles');

router.get('/', (req, res) => {
    articles.aggragatedFind().then((result) => {
        res.header("Access-Control-Allow-Origin", "http://localhost:4200");
        res.header("Access-Control-Allow-Methods", "POST,GET,OPTIONS, PUT, DELETE");
        res.send({articles: result});
    }, function(err) {
        console.log('articles.find ERR', err);
    });

    // articles.find().then((result) => {
    //     console.log("articles.find result", result);
    //     res.send(result);
    // }, function(err) {
    //     console.log('articles.find ERR', err);
    // });
});

router.get('/agg', (req, res) => {
    articles.aggragatedFind().then((result) => {
        res.send({articles: result});
    }, function(err) {
        console.log('articles.find ERR', err);
    });
});

module.exports = router;
