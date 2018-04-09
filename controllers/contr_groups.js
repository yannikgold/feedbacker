var models = require('../models/mdl_generics');

var controller = {
    openGroup: function(ID, callback){
        models.findOne('groups', {code: ID}, {}, function(err, result){
            console.log('result: ', result);
            if(result){
                console.log('Group already exists!');
                console.log('MongoID of group: ', result._id);
                models.findAll('states', {groupID: result._id}, {}, function(err, result){
                    if(!err){
                        callback(result);
                    } else {
                        console.error(err);
                    }
                });
            } else {
                models.addNew('groups', {code: ID}, function(err, result){
                    if(!err){
                        callback();
                    } else {
                        console.error(err);
                    }
                });
            }
        });
    }
}

module.exports = controller;