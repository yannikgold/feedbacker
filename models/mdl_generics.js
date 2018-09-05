var MongoClient = require('mongodb').MongoClient;

// Connection URL
//const url = 'mongodb://localhost:27017';
const url = 'mongodb://emotionalaudit:MgmP8AqqnjtL315r22O6oGTneRm3IskffbfamGy9YUxM1Rqbbvqa5i7Naqv87a6Kgd4Z8fZuGG9z3OApmoPboQ%3D%3D@emotionalaudit.documents.azure.com:10255/?ssl=true'

// Database Name
//const dbName = 'emotionalAudit';
const dbName = 'emotionalaudit';

var model = {
    findAll: function(collection, query, projection, callback){
        // Use connect method to connect to the server
        MongoClient.connect(url, function(err, client) {
            const db = client.db(dbName);
            const col = db.collection(collection);
            
            // Find some documents
            col.find(query).project(projection).toArray(function(err, result) {
                client.close();
                callback(err, result);
            });
        });
    },
    findOne: function(collection, query, projection, callback){
        // Use connect method to connect to the server
        MongoClient.connect(url, function(err, client) {
            const db = client.db(dbName);
            const col = db.collection(collection);
            
            // Find one document
            col.findOne(query, projection, function(err, result) {
                client.close();
                callback(err, result);
            });
        });
    },
    addNew: function(collection, data, callback){
        MongoClient.connect(url, function(err, client) {
            const db = client.db(dbName);
            const col = db.collection(collection);
            
            col.insertOne(data, function(err, result) {
                client.close();
                callback(err, result);
            });
        });
    },
    updateOne: function(collection, query, data, callback){
        MongoClient.connect(url, function(err, client) {
            const db = client.db(dbName);
            const col = db.collection(collection);
            
            col.updateOne(query, { $set: data }, function(err, result) {
                client.close();
                callback(err, result);
            });
        });
    }
}

module.exports = model;