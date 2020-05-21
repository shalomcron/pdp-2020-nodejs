const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const articlesCollection = require('./articles');
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
        console.log('Connected correctly to server');
        calback();
    });

}

function getDB() {
    return db;
}

module.exports = {
    initMongoDB: initMongoDB,
    getDB: getDB
};
