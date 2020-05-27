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
            console.log("articles Collection created !!!!");
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

function aggregatedFind() {
    const pipeline = [
            {
                $lookup:
                    {
                        from: "subjects",
                        localField: "subject",
                        foreignField: "subject",
                        as: "subject"
                    }
            }
        ]
    ;
    return collection.aggregate(pipeline).toArray();
    //
    // return collection.aggregate(pipeline).toArray()
    //     .then(articles => {
    //         console.log(`Successfully grouped purchases for ${articles.length} articles.`)
    //         for(const article of articles) {
    //             console.log(`article: ${article}`)
    //             console.log(`article: ` + JSON.stringify(article))
    //         }
    //         return articles
    //     })
    //     .catch(err => console.error(`Failed to group purchases by articles: ${err}`))

}

module.exports = {
    createCollection: createCollection,
    createOne: createOne,
    updateOne: updateOne,
    find: find,
    aggragatedFind: aggregatedFind
    // delete
};

