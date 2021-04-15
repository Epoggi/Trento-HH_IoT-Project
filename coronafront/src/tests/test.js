var assert = require('assert');
//get functions from Charts.js
const {Charts} = require('../pages/Charts.js')

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

describe('Charts.js function tests', function(){
  describe('Check Risks functions', function(){
    describe('Check all risks', function(){
      it('testing..', function(){
        
    const testData = [
      {
          "name": "Location",
          "time": 1614944496619605500,
          "room": "lab",
          "tagID": 1,
          "x": 2.693613716183034,
          "y": 3.5775570877129788
      },
      {
        "name": "Location",
        "time": 1614944496619605500,
        "room": "lab",
        "tagID": 2,
        "x": 2.693613716183034,
        "y": 3.5775570877129788
    },

  ]

        let result = Charts.checkRisk(testData)

        assert.deepStrictEqual(result, [
          {
            //expected risk results
          }
        ])
      });
    });
    describe('Check room risks', function(){

    });
    describe('Check individual risks', function(){

    });
  });
});