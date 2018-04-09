var express = require('express');
var router = express.Router();
var groups = require('../controllers/contr_groups.js');
var states = require('../controllers/contr_states.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/:group', function(req, res, next){
  var code = req.params.group;
  //console.log(req.params['0']);
  groups.openGroup(code, function(data){
    /*if(!data){
      res.send('New group added successfully!');   
    } else {*/
      res.render('selection', {code: code});
    //}
  });
});

router.get('/:group/lecturer', function(req, res, next){
  console.log('lecturer öffnen');
  res.render('lecturer');
});

router.get('/:group/student', function(req, res, next){
  console.log('student öffnen');
  res.render('student');
});

router.post('/:group/student/addState', function(req, res, next){
  console.log('adding State');
  console.log('reqbody: ', req.body);
  states.addState(req.params.group, req.body, function(data){

  });
});

module.exports = router;
