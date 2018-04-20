var models = require('../models/mdl_generics');

var controller = {
    addState: function(groupID, stateData, callback){
        models.findOne('groups', {code: groupID}, {_id: 1}, function(err, result){
            if(result){
                console.log('group MongoID:', result);
                var state = {
                    group_id: result._id,
                    state: parseInt(stateData.state),
                    browser_id: stateData.browserID,
                    time: new Date()
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
                        models.updateOne('states', {_id: result._id}, {state: parseInt(stateData.state), time: new Date()}, function(err, result){
                            console.log('updated');
                            if(!err){
                                callback();
                            }
                        });
                    }
                });
            }
        });
    },
    getStates: function(groupID, callback){
        models.findOne('groups', {code: groupID}, {_id: 1}, function(err, result){
            if(result){
                models.findAll('states', {group_id: result._id}, {}, function(err, results){
                    if(!err){
                        var voteArray = [0, 0, 0, 0, 0];
                        results.forEach(function(vote){
                            voteArray[parseInt(vote.state) - 1] = voteArray[parseInt(vote.state) - 1] + 1;
                        });
                        callback(voteArray);
                    }
                });
            }
        });
    },
    getState: function(groupID, browserID, callback){
        models.findOne('groups', {code: groupID}, {_id: 1}, function(err, result){
            if(result){
                console.log('group MongoID:', result);

                models.findOne('states', {browser_id: browserID, group_id: result._id}, {}, function(err, result){
                    
                    if(result){
                        console.log('result: ', result.state);
                        var obj = {
                            state: result.state
                        }
                        callback(obj);
                    } else {
                        callback();
                    }
                });
            }
        });
    }
}

module.exports = controller;