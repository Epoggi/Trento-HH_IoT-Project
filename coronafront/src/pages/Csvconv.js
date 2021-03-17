import React, { useEffect } from 'react';
import TrentoData from '../../../coronaback/TrentoData.csv'


function Convert() {
  
    //Usage
    //Generate JSON file
    let csvToJson = require('convert-csv-to-json');
    
    let fileInputName = TrentoData; 
    let fileOutputName = 'TrentoDataJSON.json';
    
    csvToJson.generateJsonFileFromCsv(fileInputName,fileOutputName);
    //Generate Array of Object in JSON format
    let csvToJson = require('convert-csv-to-json');
    
    let json = csvToJson.getJsonFromCsv("../../../coronaback/TrentoData.csv");
    for(let i=0; i<json.length;i++){
        console.log(json[i]);
    }

    return (
        
    );
}

export default Convert