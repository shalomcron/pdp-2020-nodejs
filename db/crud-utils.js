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

function read(collection, searchBy) {
    return new Promise(function (resolve, reject) {
        // Do async job
        collection.find(searchBy || {}).toArray((err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.stringify(result));
            }
        });
    })
}

module.exports = {
    createOne: createOne,
    read: read,
    updateOne: updateOne,
    // delete
};

