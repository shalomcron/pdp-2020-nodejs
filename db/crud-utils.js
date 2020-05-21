const assert = require('assert');

function createOne(collection, dataRow) {
    // Insert a single document
    collection.insertOne(dataRow, function (err, r) {
        assert.equal(null, err);
        assert.equal(1, r.insertedCount);
        console.log("row inserted:", dataRow);
    });
}

function updateOne(collection, dataRow) {
    // Update a single document
    collection.updateOne({myId: dataRow.myId}, {$set: dataRow}, function (err, r) {
        assert.equal(null, err);
        assert.equal(1, r.matchedCount);
        console.log("row updated:", dataRow);
    });
}

function readOne(collection, subject) {

}

module.exports = {
    createOne: createOne,
    readOne: readOne,
    updateOne: updateOne,
    // delete
};

