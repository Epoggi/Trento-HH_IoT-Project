var assert = require('assert');

import DataJson from '../data/csvjson.json'

import * as Functions from '../pages/Functions'




describe('Functions.js function tests', function(){
  it('Data trimming', function(){
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

  let result = Functions.trimData(testData)

  console.log("Result: " + result)

  assert.deepStrictEqual(result, [
    {
      name: "Location",
      time: 1614944496619605500,
      room: "lab",
      tagID: 1,
      x: 2,
      y: 3
  }])
  })

  it('trimming with rawdata', function(){
    let rawdata = DataJson
   /*  for (let i = 0; i < rawdata.length; i++){
      console.log("Date: " + new Date(rawdata[i].time / 1000000))
    } */
  
    //rawdata.length = 10000
  /*   rawdata = rawdata.sort(function(a,b){
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(b.time/1000000) - new Date(a.time/1000000);
    });
 */
    let result = Functions.trimData(rawdata)
   // console.log("Result: " + result)
    for (let i = 0; i < result.length; i++){
      //console.log("Date: " + new Date(result[i].time / 1000000))
    }
  })
  describe('Check Risks functions', function(){
    describe('Check all risks', function(){
      it('checkRisks func with real data', function(){
        console.log("---------------------------------------------")
        console.log("Checkrisks real data test start")
        console.log("---------------------------------------------")
        let rawdata = DataJson
        let trimmedData = Functions.trimData(rawdata)
        //trimmedData.length = 5;

        console.log("Trimmed Data length: " + trimmedData.length)
        console.log("First element of trimmed Data compared to rawdata")
        console.log("TrimmedData[0]: " + JSON.stringify(trimmedData[0]) + " and rawdata[0]: " + JSON.stringify(rawdata[0]))

        let result = Functions.checkRisk(trimmedData)

        console.log("result length after checkRisk: " + result.length)
        console.log("first item of result" + JSON.stringify(result[0]));

      
        //assert.
      })
      it('checkRisks with dummy data', function(){
        console.log("---------------------------------------------")
        console.log("Checkrisks dummy test start")
        console.log("---------------------------------------------")
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