import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Scatter } from 'react-chartjs-2';
import DateTimePicker from 'react-datetime-picker';
import { Button } from '@material-ui/core';
import * as Functions from './Functions'

//Test data provided by Trento
//import name from 'location'
//import DataJson from '../data/csvjson.json'

//Csv use
import { CSVLink } from "react-csv";
import CSVReader from "react-csv-reader";


//Main function of Charts.js
function Charts() {
//React useState which receives uploaded CSV 
    const [uploadData, setUploadData] = React.useState([{
        "name": "Dummy",
        "time": 1614944496619605500,
        "room": "dummy",
        "tagID": 1,
        "x": 2,
        "y": 3
    }])
//Simple function to set given data into set useState
    const handleData = (data, fileInfo) => setUploadData(data);
    
    const papaparseOptions = {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      transformHeader: header => header.toLowerCase().replace(/\W/g, "_")
    };
  

    //Functions.
//setState for datepicker, picking new time points to use
    const [readyData, setReadyData] = React.useState([]);

    const [trimmedData, setTrimmedData] = React.useState([]);
//useEffect activates each time uploadData is updated, sets data into trimmed state after using trimData function which reduces the data points
//by minutes, eliminating the rest.
    useEffect(() => { setTrimmedData(Functions.trimData(uploadData)) }, [uploadData]);

//useStates for managing the earliest and latest time points, showing on datepicker  
    const [earliest, setEarliest] = React.useState()
    const [latest, setLatest] = React.useState()

//useEffect activates each time uploadData is updated
    useEffect(() => { minmaxTime() }, [uploadData]);

//Function to dig the data for first and last time points
    const minmaxTime = () => {
        let i;
        let min = uploadData[0];
        let max = uploadData[0];
        for (i = 0; i < uploadData.length; i++) {

            if (uploadData[i].time < min.time) {
                min = uploadData[i]
            }
            else if (uploadData[i].time > max.time) {
                max = uploadData[i]
            }
        }
        setEarliest(new Date(min.time / 1000000));
        setLatest(new Date(max.time / 1000000));
    }

//function activates with the filter button, uses time points user picked with time picker
    const filterData = () => {
        let thisdata = trimmedData.filter(trimmedData => earliest <= new Date(trimmedData.time / 1000000));
        thisdata = thisdata.filter(thisdata => latest >= new Date(thisdata.time / 1000000));
        setReadyData(thisdata);
    }
//Scatter chart usage
    const data = {
        labels: ['Scatter'],
        datasets: [
            {
                label: 'My First dataset',
                fill: true,
                backgroundColor: 'rgba(0,0,160,0.4)',
                pointBorderColor: 'rgba(0,0,160,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 3,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(0,0,160,1)',
                pointHoverBorderColor: 'rgba(0,0,160,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: trimmedData,
                options: {
                    tooltips: {
                        mode: 'index'
                    }
                }
            }
        ]
    };
//Main returns of Chart.js
    return (
        <div>
            
                <div>
                    <Grid container spacing={1} justify="center">
                        <Grid container item xs={12} spacing={3} justify="center" style={{ marginRight: 100 }}>
                            <Grid item xs={8}>
                                <h2>Charts</h2>
                                <Scatter data={data} />
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} spacing={3} direction="row" justify="center" alignItems="center" style={{ margin: 5 }}>
                            <Grid item xs={4} justify="center" direction="column">
                                <Typography>
                                    Earliest
                                </Typography>
                                <DateTimePicker
                                    onChange={setEarliest}
                                    value={earliest}
                                />
                            </Grid>
                            <Grid item xs={4} justify="center" direction="column">
                                <Typography>
                                    Latest
                                </Typography>
                                <DateTimePicker
                                    onChange={setLatest}
                                    value={latest}
                                />
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} spacing={3} direction="row" justify="flex-end" alignItems="center">
                            <Grid item xs={6} style={{ backgroundColor: "white" }}>
                                <CSVReader
                                    cssClass="react-csv-input"
                                    label="Select CSV data to parse. "
                                    onFileLoaded={handleData}
                                    parserOptions={papaparseOptions}
                                />                                
                            </Grid>

                            <Grid container item xs={4} spacing={1} direction="column" justify="flex-start" alignItems="flex-start">
                                <Grid item xs={4}>
                                    <Button onClick={filterData} color="primary" variant="contained">
                                        filter
                                    </Button>
                                </Grid>
                                <Grid item xs={4}>
                                    <CSVLink
                                        data = {Functions.checkRisk(trimmedData)}
                                        headers={[
                                            {label: 'Distance', key: 'dist'},
                                            {label: 'Person 1', key: 'person1'},
                                            {label: 'Person 2', key: 'person2'},
                                            {label: 'Time', key: 'time'},
                                            {label: 'Room of Person 1', key: 'room1'},
                                            {label: 'Room of Person 2', key: 'room2'},
                                            {label: 'Risk', key: 'risk'},
                                        ]}
                                        filename={"Risks.csv"}
                                        target="_blank"
                                    >
                                        Download Data CSV
                                    </CSVLink>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>
                </div>
            
        </div>
    );
}
//Exporting the results to use
export default Charts