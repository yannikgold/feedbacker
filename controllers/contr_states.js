var models = require('../models/mdl_generics');

var controller = {
    addState: function(groupID, stateData, callback){
        models.findOne('groups', {code: groupID}, {_id: 1}, function(err, result){
            if(result){
                console.log('group MongoID:', result);
                var state = {
                    group_id: result._id,
                    state: stateData.state,
                    browser_id: stateData.browserID
                }
                models.findOne('states', {browser_id: stateData.browserID, group_id: result._id}, {}, function(err, result){
                    if(!result){
                        models.addNew('states', state, function(err, result){
                            console.log('added New');
                            if(!err){
                                callback(); 
                            }
                        });
                    } else {
                        models.updateOne('states', {_id: result._id}, {state: stateData.state}, function(err, result){
                            console.log('updated');
                            if(!err){
                                callback();
                            }
                        });
                    }
                });
            }
        });
    }
}

module.exports = controller;