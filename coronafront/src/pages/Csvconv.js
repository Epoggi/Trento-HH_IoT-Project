import React, { useEffect } from 'react';
import TrentoData from '../../../coronaback/data/TrentoData.csv'
import DataJson from '../../../coronaback/data/TrentoDataJSON.json'

    let fileInput = TrentoData; 
    let fileOutput = DataJson;

function Convert() {

    const csv2json = require('./csv2json.js');

    const csv = fileInput;

    const json = csv2json(csv, {parseNumbers: true});
    console.log(json);

  /* 
    //Usage
    //Generate JSON file
    let csvToJson = require('convert-csv-to-json');
    
    let fileInput = TrentoData; 
    let fileOutput = '../../../coronaback/data/TrentoDataJSON.json';
    
    csvToJson.generateJsonFileFromCsv(fileInputName,fileOutput);
    //Generate Array of Object in JSON format
    let csvToJson = require('convert-csv-to-json');
    
    let json = csvToJson.getJsonFromCsv("../../../coronaback/data/TrentoData.csv");
    for(let i=0; i<json.length;i++){
        console.log(json[i]);
    } 

    return (
        true
    );*/
}

export default Convert