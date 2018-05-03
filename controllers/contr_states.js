var models = require('../models/mdl_generics');

var decaySeconds = 180;

var controller = {
    addState: function(groupID, stateData, callback){
        models.findOne('groups', {code: groupID}, {_id: 1}, function(err, result){
            if(result){
                var state = {
                    group_id: result._id,
                    state: parseInt(stateData.state),
                    browser_id: stateData.browserID,
                    time: new Date(),
                    counter: 0
                }
                models.findOne('states', {browser_id: stateData.browserID, group_id: result._id}, {}, function(err, result){
                    if(!result){
                        models.addNew('states', state, function(err, result){
                            if(!err){
                                callback(); 
                            }
                        });
                    } else {
                        models.updateOne('states', {_id: result._id}, {state: parseInt(stateData.state), time: new Date(), counter: result.counter + 1}, function(err, result){
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
                models.findAll('states', {group_id: result._id, time: {$gte: new Date(Date.now() - 1000*decaySeconds)} }, {}, function(err, results){
                    if(!err){
                        var voteArray = [0, 0, 0, 0, 0];
                        results.forEach(function(vote){
                            //Berechnung der Gewichtung des Votes Anhand der decayTime.
                            var startDate = new Date(Date.now());
                            var endDate   = new Date(vote.time);
                            var seconds = (startDate.getTime() - endDate.getTime()) / 1000;

                            var voteWeight = parseFloat(1 - (seconds/decaySeconds));
                            
                            //Zusammenzählen der einzelnen Votes in ein gesammeltes Array.
                            voteArray[parseInt(vote.state) - 1] = voteArray[parseInt(vote.state) - 1] + voteWeight;
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
                models.findOne('states', {browser_id: browserID, group_id: result._id}, {}, function(err, result){
                    
                    if(result){
                        //Berechnung der Gewichtung des Votes Anhand der decayTime.
                        var startDate = new Date(Date.now());
                        var endDate   = new Date(result.time);
                        var seconds = (startDate.getTime() - endDate.getTime()) / 1000;

                        var voteWeight = parseFloat(1 - (seconds/decaySeconds)).toFixed(2);

                        var obj = {
                            state: result.state,
                            weight: voteWeight
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