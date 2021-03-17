import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Scatter } from 'react-chartjs-2';
import DateTimePicker from 'react-datetime-picker';
import { Button } from '@material-ui/core';
import csvToJson from 'convert-csv-to-json';
import fs from 'fs'; 

function Charts() {

    // Declaring variable for storing CSV Data as Json
    let json = csvToJson.getJsonFromCsv("../../position.csv");
    console.log(json);

    // Test data for all this.
    const rawdata = [
        { x: 15, y: 30, timestamp: "2020-02-11T09:10:30.000Z", tagId: 1, roomid: 1, },
        { x: 20, y: 17, timestamp: "2020-02-11T09:18:30.000Z", tagId: 2, roomid: 2, },
        { x: 13, y: 34, timestamp: "2020-02-11T09:30:30.000Z", tagId: 3, roomid: 3, },
        { x: 25, y: 10, timestamp: "2020-02-11T09:18:30.000Z", tagId: 4, roomid: 4, },
        { x: 22, y: 19, timestamp: "2020-02-11T09:17:30.000Z", tagId: 6, roomid: 5, },
        { x: 12, y: 37, timestamp: "2020-02-11T09:12:30.000Z", tagId: 7, roomid: 6, },
        { x: 15, y: 30, timestamp: "2020-02-11T09:10:30.000Z", tagId: 5, roomid: 1, },
        { x: 28, y: 13, timestamp: "2020-02-11T09:24:30.000Z", tagId: 8, roomid: 7, },
        { x: 16, y: 38, timestamp: "2020-02-11T09:05:30.000Z", tagId: 9, roomid: 8, },
        { x: 29, y: 15, timestamp: "2020-02-11T09:16:30.000Z", tagId: 10, roomid: 9, },
        { x: 15, y: 31, timestamp: "2020-02-11T09:32:30.000Z", tagId: 11, roomid: 10, },
        { x: 26, y: 13, timestamp: "2020-02-11T09:15:30.000Z", tagId: 12, roomid: 11, }
    ]

    // Filtered Data
    const [readyData, setReadyData] = React.useState([]);
    // Earliest and latest date for filtering the data.
    const [earliest, setEarliest] = React.useState(new Date(Math.min(...rawdata.map(e => new Date(e.timestamp)))));
    const [latest, setLatest] = React.useState(new Date(Math.max(...rawdata.map(e => new Date(e.timestamp)))));

    // How large of a window of time is used for checking infection risk. In minutes.
    const [mins, setMins] = React.useState(5);
    // List of possible points at which infection could happen.
    let risks = []

    // This checks for proximity within a certain timeframe as defined with the mins variable to see if there are any risks of infection.
    //It only searches in filtered data.
    const checkRisk = () => {
        let i;
        for(i = 0; i < readyData.length-1; i++){
            console.log("I: " + i);
            let comparable = new Date(readyData[i].timestamp);
            console.log("Comparable: " + comparable);
            let i2;

            for(i2 = i+1; i2 < readyData.length; i2++) {
                console.log("I2: " + i2);
                console.log("Compared to: " + new Date(readyData[i2].timestamp));
                console.log("time comparison: " + Math.abs(comparable.getTime() - new Date(readyData[i2].timestamp))/1000/60);

                if(Math.abs(comparable - new Date(readyData[i2].timestamp))/1000/60 < mins){
                    let distance = calcDist(readyData[i], readyData[i2]);
                    console.log("Distance: " + distance);
                    console.log("-----");

                    if (distance < 1){
                        risks.push( {"dist": distance, "person1": readyData[i].tagId, "person2": readyData[i2].tagId, "time": readyData[i].timestamp, "risk": "High."} );
                    } else if (distance < 2){
                        risks.push( {"dist": distance, "person1": readyData[i].tagId, "person2": readyData[i2].tagId, "time": readyData[i].timestamp, "risk": "Medium."} );
                    } else if (distance < 4) {
                        risks.push( {"dist": distance, "person1": readyData[i].tagId, "person2": readyData[i2].tagId, "time": readyData[i].timestamp, "risk": "Low."} );
                    }
                }
            }
        }
        console.log(risks);
        console.log("---------------------------------------------")
    }

    // Filters data for viewing and risk seeking.
    const filterData = () => {
        let thisdata = rawdata.filter(rawdata => earliest <= new Date(rawdata.timestamp));
        thisdata = thisdata.filter(thisdata => latest >= new Date(thisdata.timestamp));
        setReadyData(thisdata);
    }

    // Calculates distance of two points.
    const calcDist = (posit1, posit2) => {
        let dist1 = Math.pow((posit1.x - posit2.x),2)
        let dist2 = Math.pow((posit1.y - posit2.y),2)

        return Math.sqrt(Math.abs(dist1+dist2))
    }

    // Chart.JS construct thing.
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
                data: readyData,
                options: {
                    tooltips: {
                        mode: 'index'
                    }
                }
            }
        ]
    };

    return (
        <div>
            {
                <div>
                    <Grid container spacing={1} justify="center">
                        <Grid container item xs={12} spacing={3} justify="center">
                            <Grid item xs={8}>
                                <h2>Charts</h2>
                                <Scatter data={data} />
                            </Grid>
                        </Grid>
                        <Grid container item xs={9} spacing={1} direction="row" justify="flex-end" alignItems="flex-end">
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
                            <Grid item xs={2}>
                                <Button onClick={filterData} color="primary" variant="contained">
                                    filter
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid container item xs={8} spacing={3} direction="row" justify="flex-end" alignItems="flex-end">
                            <Grid item xs={2}>
                                <Button onClick={checkRisk} color="primary" variant="contained">
                                    get risks
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid container item xs={8} spacing={3} direction="row" justify="center" alignItems="center">
                            <Grid item xs={2}>
                                <Typography>Risk points</Typography>
                            </Grid>
                            <Grid>
                                <ul>
                                    {risks.map((item, index) => (
                                        <li key={index}>
                                            <Typography>People: {item.person1} and {item.person2}. Distance: {item.dist.toFixed(2)}. Time: {item.time}.</Typography>
                                        </li>
                                    ))}
                                </ul>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            }
        </div>
    );
}

export default Charts