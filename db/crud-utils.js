const assert = require('assert');
const collectionName = 'articles';
let collection;

function createCollection(callback) {
    var mongoDB = require('./connect');
    mongoDB.getDB().createCollection(collectionName, {
            'validator': {
                '$or': [
                    {'subject': {'$type': "string"}},
                    {'header': {'$type': "string"}},
                    {'body': {'$type': "string"}}
                ]
            }
        }, function (err, results) {
            console.log("Collection created. results", results);
            collection = results;
            callback();
        }
    );
};

function create(dataRow) {
    // Insert a single document
    collection.insertOne(dataRow, function (err, r) {
        assert.equal(null, err);
        assert.equal(1, r.insertedCount);
        console.log("row inserted:", dataRow);
    });
}

function update(dataRow) {
    // Update a single document
    var mongoDB = require('./connect');
    collection.updateOne({subject: dataRow.subject}, {$set: dataRow}, function (err, r) {
        assert.equal(null, err);
        assert.equal(1, r.matchedCount);
        console.log("row updated:", dataRow);
    });
}

function find(subject) {

}

module.exports = {
    createCollection: createCollection,
    create: create,
    read: find,
    update: update,
    // delete
};

