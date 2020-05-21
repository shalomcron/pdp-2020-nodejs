const assert = require('assert');

function insertOne(collection, dataRow) {
    // Insert a single document
    collection.insertOne(dataRow, function (err, r) {
        assert.equal(null, err);
        assert.equal(1, r.insertedCount);
        console.log("row inserted:", dataRow);
    });
}

function updateOne(collection, dataRow) {
    // Update a single document
    var mongoDB = require('./connect');
    collection.updateOne({subject: dataRow.subject}, {$set: dataRow}, function (err, r) {
        assert.equal(null, err);
        assert.equal(1, r.matchedCount);
        console.log("row updated:", dataRow);
    });
}

function find(collection, subject) {

}

module.exports = {
    createCollection: createCollection,
    create: create,
    read: find,
    update: update,
    // delete
};

