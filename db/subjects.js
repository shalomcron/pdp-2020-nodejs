const crudUtils = require('./crud-utils');
const collectionName = 'subjects';
let collection;

function createCollection(callback) {
    var mongoDB = require('./connect');
    mongoDB.getDB().createCollection(collectionName, {
            'validator': {
                '$or': [
                    {'myId': {'$type': "number"}},
                    {'subject': {'$type': "string"}},
                    {'description': {'$type': "string"}},
                ]
            }
        }, function (err, results) {
            console.log("subjects Collection created");
            collection = results;
            callback();
        }
    );
}

function createOne(dataRow) {
    // Insert a single document
    crudUtils.createOne(collection, dataRow);
}


function updateOne(dataRow) {
    // Update a single document
    crudUtils.updateOne(collection, dataRow);
}

function find(searchBy) {
    // Find a single document
    return crudUtils.read(collection, searchBy);
}

module.exports = {
    createCollection: createCollection,
    createOne: createOne,
    updateOne: updateOne,
    find: find,
    // delete
};

