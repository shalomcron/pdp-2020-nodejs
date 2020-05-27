const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
var articles = require('./articles');

// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'articlesDB';
let db;

function initMongoDB(calback) {
// Use connect method to connect to the Server
    MongoClient.connect(url, function(err, client) {
        assert.equal(null, err);
        db = client.db(dbName);
        console.log('Connected correctly to DB server !!!!');
        calback();
    });

}

function getDB() {
    return db;
}

initMongoDB(() => {
    articles.createCollection(() => {});
});

module.exports = {
    initMongoDB: initMongoDB,
    getDB: getDB
};
