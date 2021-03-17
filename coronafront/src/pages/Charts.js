import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Scatter } from 'react-chartjs-2';
import DateTimePicker from 'react-datetime-picker';
import { Button } from '@material-ui/core';


function Charts() {
  
    const [mins, setMins] = React.useState(5);

    const [readyData, setReadyData] = React.useState([]);

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

    let risks = []

    const checkRisk = () => {
        let i;
        for(i = 0; i < rawdata.length-1; i++){
            console.log("I: " + i);
            let comparable = new Date(rawdata[i].timestamp);
            console.log("Comparable: " + comparable);
            let i2;

            for(i2 = i+1; i2 < rawdata.length; i2++) {
                console.log("I2: " + i2);
                console.log("Compared to: " + new Date(rawdata[i2].timestamp));
                console.log("time comparison: " + Math.abs(comparable.getTime() - new Date(rawdata[i2].timestamp))/1000/60);

                if(Math.abs(comparable - new Date(rawdata[i2].timestamp))/1000/60 < mins){
                    let distance = calcDist(rawdata[i], rawdata[i2]);
                    console.log("Distance: " + distance);
                    console.log("-----");

                    if (distance < 5){
                        risks.push( {"dist": distance, "person1": rawdata[i].tagId, "person2": rawdata[i2].tagId, "time": rawdata[i].timestamp} );
                    }
                }
            }
        }
        console.log(risks);
        console.log("---------------------------------------------")
    }

    const [earliest, setEarliest] = React.useState(new Date(Math.min(...rawdata.map(e => new Date(e.timestamp)))));
    const [latest, setLatest] = React.useState(new Date(Math.max(...rawdata.map(e => new Date(e.timestamp)))));

    const filterData = () => {
        let thisdata = rawdata.filter(rawdata => earliest <= new Date(rawdata.timestamp));
        thisdata = thisdata.filter(thisdata => latest >= new Date(thisdata.timestamp));
        setReadyData(thisdata);
    }

    const calcDist = (posit1, posit2) => {
        let dist1 = Math.pow((posit1.x - posit2.x),2)
        let dist2 = Math.pow((posit1.y - posit2.y),2)

        return Math.sqrt(Math.abs(dist1+dist2))
    }

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
                        <Grid container item xs={12} spacing={3} direction="row" justify="center" alignItems="center">
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
                        <Grid container item xs={12} spacing={3} direction="row" justify="flex-end" alignItems="flex-end">
                            <Grid item xs={4}>
                                <Button onClick={filterData} color="primary" variant="contained">
                                    filter
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} spacing={3} direction="row" justify="flex-end" alignItems="flex-end">
                            <form>
                                <Button onClick={checkRisk} color="primary" variant="contained">
                                    get risks
                                </Button>
                            </form>
                        </Grid>
                    </Grid>
                </div>
            }
        </div>
    );
}

export default Charts