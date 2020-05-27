var express = require('express');
var router = express.Router();
var articles = require('../db/articles');

router.get('/', (req, res) => {
    articles.aggragatedFind().then((result) => {
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

router.post('/', (req, res) => {
    var dataRow = req.body;
    console.log('outer.post 33 dataRow', dataRow);
    articles.createOne(dataRow).then(() => {
        res.send(true);
    }, function(err) {
        console.log('articles.post dataRow ERR', err);
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
