var assert = require('assert');
//get functions from Charts.js

import * as Functions from '../pages/Functions'

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

describe('Functions.js function tests', function(){
  describe('Check Risks functions', function(){
    describe('Check all risks', function(){
      it('testing..', function(){
        
    const testData = [
      {
          "name": "Location",
          "time": 1614944496619605500,
          "room": "lab",
          "tagID": 1,
          "x": 2,
          "y": 3
      },
      {
        "name": "Location",
        "time": 1614944496619605500,
        "room": "lab",
        "tagID": 2,
        "x": 2,
        "y": 3
    },

  ]

        let result = Functions.checkRisk(testData)

        assert.deepStrictEqual(result, [
          {
            //console.log(result)
            //expected risk results
            //"dist": distance, "person1": readyData[i].tagID, "person2": readyData[i2].tagID, "time": new Date(readyData[i].time / 1000000), "risk": "high" });
            dist: 0, person1: 1, person2: 2, time: new Date(1614944496619605500 / 1000000), risk: "high"
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