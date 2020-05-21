const crudUtils = require('./crud-utils');
const collectionName = 'articles';
let collection;

function createCollection(callback) {
    var mongoDB = require('./connect');
    mongoDB.getDB().createCollection(collectionName, {
            'validator': {
                '$or': [
                    {'myId': {'$type': "number"}},
                    {'subject': {'$type': "string"}},
                    {'header': {'$type': "string"}},
                    {'body': {'$type': "string"}}
                ]
            }
        }, function (err, results) {
            console.log("Collection created");
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

