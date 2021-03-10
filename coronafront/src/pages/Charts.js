import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Scatter } from 'react-chartjs-2';
import DateTimePicker from 'react-datetime-picker';
import { Button } from '@material-ui/core';

function Charts() {

    /*const [user, setUser] = React.useState([]);

    const getData = async () => {
        fetch('http://localhost:8080/user')
        .then(res => res.text())
        .then(res => setUser({message: res}));
    }*/

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

    const [earliest, setEarliest] = React.useState(new Date(Math.min(...rawdata.map(e => new Date(e.timestamp)))));
    const [latest, setLatest] = React.useState(new Date(Math.max(...rawdata.map(e => new Date(e.timestamp)))));

    const filterData = () => {
        let thisdata = rawdata.filter(rawdata => earliest <= new Date(rawdata.timestamp));
        thisdata = thisdata.filter(thisdata => latest >= new Date(thisdata.timestamp));
        setReadyData(thisdata);
    }

    const calcDist = (posit1, posit2) => {
        let dist1 = posit1.y - posit1.x
        let dist2 = posit2.y - posit2.x
        return Math.hypot(dist1, dist2)
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
                    </Grid>
                </div>
            }
        </div>
    );
}

export default Charts