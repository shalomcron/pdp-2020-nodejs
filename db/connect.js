const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
var articles = require('./articles');

// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'articlesDB';
let db;

function createCollections() {
    articles.createCollection();
}

function getDB() {
    return db;
}

function initMongoDB() {
// Use connect method to connect to the Server
    MongoClient.connect(url, function(err, client) {
        assert.equal(null, err);
        db = client.db(dbName);
        console.log('Connected correctly to DB server !!!!');
        createCollections();
    });

}



module.exports = {
    initMongoDB: initMongoDB,
    getDB: getDB
};
