import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Scatter } from 'react-chartjs-2';
import DateTimePicker from 'react-datetime-picker';
import { Button } from '@material-ui/core';
import DataJson from '../data/csvjson.json'


function Charts() {
  
    const [secs, setMins] = React.useState(1);

    const [readyData, setReadyData] = React.useState([]);

    const trentodata = DataJson;

//{tagId: 0, risk: 0, route: [{time: 0, x:0, y:0},{time:1, x:1, y:1}]},
//{tagId: 1, risk: 0, route: [{time: 0, x:0, y:0},{time:1, x:1, y:1}]}
/*     const routeData = [
        {tagID, risk, route:[{time,x,y}]}
    ]
 */
//{overall risk levels, close contact situations, directional contact:[{face to face, shoulder to shoulder, ...}]}
    const summary = []

    const testData = [
        {
            "name": "Location",
            "time": 1614944496619605500,
            "room": "lab",
            "tagID": 2,
            "x": 2.693613716183034,
            "y": 3.5775570877129788
          }
    ]

    //create an array {tagId: i, route: {time: t, x: z, y: z}}
/*
    const users = () => {
        let i;
        for(i = 0; i < trentodata.length-1; i++){
            //if tagID not on list, push tagID into routeData.tagID && route info
            //else if tagID on list, push route info
            if (trentodata[i].tagID )
    }}
*/

    let risks = []
    //modify rist check to check through routeData
    const checkRisk = () => {
        risks = []
        let i;

        //Starting the loop into the data.
        for(i = 0; i < readyData.length-1; i++){
            //console.log("I: " + i);
            //Getting a date to compare to.
            let comparable = new Date(readyData[i].time/1000000);
            //console.log("Comparable: " + comparable);
            //Initializing the integer being compared to
            let i2;

            //Looping i2 to be every object after i
            for(i2 = i+1; i2 < readyData.length; i2++) {

                // checking that i and i2 aren't the same person and that they are in the same room.
                if(readyData[i].tagID != readyData[i2].tagID && readyData[i].room === readyData[i2].room){
                /*console.log("I2: " + i2);
                console.log("Compared to: " + new Date(readyData[i2].time/1000000));
                console.log("time comparison: " + Math.abs(comparable.getTime() - new Date(readyData[i2].time/1000000))/1000);*/

                    //comparing if the two datapoints are within a certain number of seconds.
                    if(Math.abs(comparable - new Date(readyData[i2].time/1000000))/1000 < secs){
                        let distance = calcDist(readyData[i], readyData[i2]);
                        //console.log("Distance: " + distance);
                        //console.log("-----");

                        //checking the distance, from the closest to the least close to account for risk from proximity.
                        if (distance < 1){
                            risks.push( { "dist": distance, "person1": readyData[i].tagID, "person2": readyData[i2].tagID, "time": new Date(readyData[i].time/1000000), "risk": "high"} );
                        } else if (distance < 2) {
                            risks.push( { "dist": distance, "person1": readyData[i].tagID, "person2": readyData[i2].tagID, "time": new Date(readyData[i].time/1000000), "risk": "medium"} );
                        } else if (distance < 4) {
                            risks.push( { "dist": distance, "person1": readyData[i].tagID, "person2": readyData[i2].tagID, "time": new Date(readyData[i].time/1000000), "risk": "low"} );
                        }
                    }
                }
            }
        }
        console.log(risks);
        console.log("---------------------------------------------")
    }

    let roomrisk = "";

    const checkRoomRisk = (room) => {
        let i;
        roomrisk = "";

        let lowrisk = 0;
        let medrisk = 0;
        let highrisk = 0;

        //Starting the loop into the data.
        for(i = 0; i < readyData.length-1; i++){

            //Getting a date to compare to.
            let comparable = new Date(readyData[i].time/1000000);

            //Initializing the integer being compared to
            let i2;
            
            //skipping cases where person 1 is not in the room we are checking
            if(readyData[i].room === room) {

                //Looping i2 to be every object after i
                for(i2 = i+1; i2 < readyData.length; i2++) {

                    //skipping cases where person 2 is not in the room we are checking
                    if(readyData[i2].room === room) {

                        // checking that i and i2 aren't the same person.
                        if(readyData[i].tagID != readyData[i2].tagID){

                            //comparing if the two datapoints are within a certain number of seconds.
                            if(Math.abs(comparable - new Date(readyData[i2].time/1000000))/1000 < secs){

                                // calculating the distance
                                let distance = calcDist(readyData[i], readyData[i2]);
                                //checking the distance, from the closest to the least close to account for risk from proximity.
                                if (distance < 1){
                                    ++highrisk;
                                } else if (distance < 2) {
                                    ++medrisk;
                                } else if (distance < 4) {
                                    ++lowrisk;
                                }


                            }
                        }
                    }
                }
            }
        }

        //Counting how many risk encounters there were
        const totalrisk = lowrisk+medrisk+highrisk;

        roomrisk = "We had a total of " + totalrisk + " encounters. " + highrisk + " of them were high risk, " + medrisk + " of them were medium risk, and " + lowrisk + " of them were low risk."

        
        if (highrisk > (totalrisk/2)){
            roomrisk = roomrisk + " The riskyness of the room is high, there's some spot where people like to get real close."
        } else if (lowrisk > (totalrisk/2)){
            roomrisk = roomrisk + " The riskyness of the room is quite low, people may like to be here, but not too close to each other."
        }
    }

    let individualrisk = [];

    //modify rist check to check through routeData
    const checkRisk = (tagID) => {
        let i;
        individualrisk = [];

        //Starting the loop into the data.
        for(i = 0; i < readyData.length-1; i++){

            //Getting a date to compare to.
            let comparable = new Date(readyData[i].time/1000000);

            //Initializing the integer being compared to
            let i2;

            //Looping i2 to be every object after i
            for(i2 = i+1; i2 < readyData.length; i2++) {

                // checking that i is the person we're checking, that i and i2 aren't the same person, and that they are in the same room.
                if(readyData[i].tagID === tagID && readyData[i].tagID != readyData[i2].tagID && readyData[i].room === readyData[i2].room){

                    //comparing if the two datapoints are within a certain number of seconds.
                    if(Math.abs(comparable - new Date(readyData[i2].time/1000000))/1000 < secs){
                        let distance = calcDist(readyData[i], readyData[i2]);

                        //checking the distance, from the closest to the least close to account for risk from proximity.
                        if (distance < 1){
                            individualrisk.push( { "dist": distance, "person2": readyData[i2].tagID, "time": new Date(readyData[i].time/1000000), "risk": "high"} );
                        } else if (distance < 2) {
                            individualrisk.push( { "dist": distance, "person2": readyData[i2].tagID, "time": new Date(readyData[i].time/1000000), "risk": "medium"} );
                        } else if (distance < 4) {
                            individualrisk.push( { "dist": distance, "person2": readyData[i2].tagID, "time": new Date(readyData[i].time/1000000), "risk": "low"} );
                        }
                    }
                }
            }
        }
        console.log(individualrisk);
        console.log("---------------------------------------------")
    }

    //mahd. spread notaatio. Laskeminen for loopin sisällä. HashMap, hajautus algoritmi.
    /* 
    const [earliest, setEarliest] = React.useState(new Date(Math.min(...trentodata.map(e => new Date(e.time/1000000)))));
    const [latest, setLatest] = React.useState(new Date(Math.max(...trentodata.map(e => new Date(e.time/1000000))))); 
    */
    const [earliest, setEarliest] = React.useState()
    const [latest, setLatest] = React.useState()

    useEffect( () => { minmaxTime() }, []);

    const minmaxTime = () => {
        let i;
        let min = trentodata[0];
        let max = trentodata[0];
        for (i = 0; i < trentodata.length; i++){
        
            if (trentodata[i].time < min.time) {
                min = trentodata[i]
            }
            else if (trentodata[i].time > max.time) {
                max = trentodata[i]
            } 
        }
        setEarliest(new Date(min.time/1000000));
        setLatest(new Date(max.time/1000000));
    }


    const filterData = () => {
        let thisdata = trentodata.filter(trentodata => earliest <= new Date(trentodata.time/1000000));
        thisdata = thisdata.filter(thisdata => latest >= new Date(thisdata.time/1000000));
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
//Warnings: Failed prop type: The prop (justify, direction) need to be set on 'container' element
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