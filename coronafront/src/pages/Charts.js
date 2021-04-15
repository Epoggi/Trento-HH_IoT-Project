import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Scatter } from 'react-chartjs-2';
import DateTimePicker from 'react-datetime-picker';
import { Button } from '@material-ui/core';
import DataJson from '../data/csvjson.json'

//drawer komponentit
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

//Summary list komponentti
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';



function Charts() {

    //drawer komponentit 
    const [drawer, setDrawer] = React.useState(0)
    // 0 = general summary, 1 personal summary, 2 room summary
    const [open, setOpen] = React.useState(false);

    const handleChange = (event) => {
        setDrawer(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };
  
    const [secs, setMins] = React.useState(1);

    const [readyData, setReadyData] = React.useState([]);

    const trentodata = DataJson;
    /*//filter rawdata by minutes */
    //useEffect(() => { filterDataByMinutes() }, []);
    
    /*const filterDataByMinutes = () => {
        //filter list to provide datapoints only every 1 minute, scrap else
        let rawdata = DataJson
        let list = [];
        
        for (let i = 0; i < rawdata.length - 1; i++) {
            //search for the minutes
            console.log(((rawdata[i].time / 1000000)/1000) % 60)

            if (((rawdata[i].time / 1000000)/1000) % 60 == 0) {
                //add rawdata with a remainder of x to the list
                list.push(rawdata[i])

                console.log(rawdata[i])
            }
        }
        return list
    }
    const timefiltereddata = filterDataByMinutes(DataJson)*/
    
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
        for (i = 0; i < readyData.length - 1; i++) {
            console.log("I: " + i);
            //Getting a date to compare to.
            let comparable = new Date(readyData[i].time / 1000000);
            console.log("Comparable: " + comparable);
            //Initializing the integer being compared to
            let i2;
            

            //Looping i2 to be every object after i
            for (i2 = i + 1; i2 < readyData.length; i2++) {
                //console.log("I2: " + i2);
                //console.log("Duplicate: " + readyData[i].tagID != readyData[i2].tagID);
                //console.log("Room1:" + new String(readyData[i].room).normalize() + " Room2:" + new String(readyData[i2].room).normalize());
                console.log("Same room: " + readyData[i].room == new String(readyData[i2].room).normalize());
                console.log("Type of room1:" + typeof readyData[i].room)
                console.log("Type of room2:" + typeof readyData[i2].room)

                // checking that i and i2 aren't the same person and that they are in the same room.
                if(readyData[i].tagID != readyData[i2].tagID && readyData[i].room == readyData[i2].room){
                console.log("Compared to: " + new Date(readyData[i2].time/1000000));
                console.log("time comparison: " + Math.abs(comparable.getTime() - new Date(readyData[i2].time/1000000))/1000);

                    //comparing if the two datapoints are within a certain number of seconds.
                    if (Math.abs(comparable - new Date(readyData[i2].time / 1000000)) / 1000 < secs) {
                        let distance = calcDist(readyData[i], readyData[i2]);
                        console.log("Distance: " + distance);
                        console.log("-----");

                        //checking the distance, from the closest to the least close to account for risk from proximity.
                        if (distance < 1) {
                            risks.push({ "dist": distance, "person1": readyData[i].tagID, "person2": readyData[i2].tagID, "time": new Date(readyData[i].time / 1000000), "risk": "high" });
                        } else if (distance < 2) {
                            risks.push({ "dist": distance, "person1": readyData[i].tagID, "person2": readyData[i2].tagID, "time": new Date(readyData[i].time / 1000000), "risk": "medium" });
                        } else if (distance < 4) {
                            risks.push({ "dist": distance, "person1": readyData[i].tagID, "person2": readyData[i2].tagID, "time": new Date(readyData[i].time / 1000000), "risk": "low" });
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
    const checkOneRisk = (tagID) => {
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

    useEffect(() => { minmaxTime() }, []);

    const minmaxTime = () => {
        let i;
        let min = trentodata[0];
        let max = trentodata[0];
        for (i = 0; i < trentodata.length; i++) {

            if (trentodata[i].time < min.time) {
                min = trentodata[i]
            }
            else if (trentodata[i].time > max.time) {
                max = trentodata[i]
            }
        }
        setEarliest(new Date(min.time / 1000000));
        setLatest(new Date(max.time / 1000000));
    }


    const filterData = () => {
        let thisdata = trentodata.filter(trentodata => earliest <= new Date(trentodata.time / 1000000));
        thisdata = thisdata.filter(thisdata => latest >= new Date(thisdata.time / 1000000));
        setReadyData(thisdata);
    }

    const calcDist = (posit1, posit2) => {
        let dist1 = Math.pow((posit1.x - posit2.x), 2)
        let dist2 = Math.pow((posit1.y - posit2.y), 2)

        return Math.sqrt(Math.abs(dist1 + dist2))
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
//material ui demo ->
//pondering how to add risks list into this..
    function generate(element) {
        return [0,1,2].map((value) =>
          React.cloneElement(element, {
            key: value,
          }),
        );
      }

    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);

    const renderlist = () => {
        return (
        <div>
            <List dense={dense}>
              {generate(
                <ListItem>
                  <ListItemText
                    primary="Single-line item"
                    secondary={secondary ? 'Secondary text' : null}
                  />
                </ListItem>,
              )}
            </List>
        </div>
        )} 
    
//material ui demo end.

    //Warnings: Failed prop type: The prop (justify, direction) need to be set on 'container' element
    return (
        <div>
            {
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
                                <h3>Summaries</h3>
                                <Grid container item xs={10} spacing={2} direction="row" justify="flex-start" alignItems="center">
                                <Grid item xs={2}>
                                <Select
                                    labelId="open-select-label"
                                    id="open-select"
                                    open={open}
                                    onClose={handleClose}
                                    onOpen={handleOpen}
                                    value={drawer}
                                    onChange={handleChange}
                                >
                                    
                                    <MenuItem value={0}>General</MenuItem>
                                    <MenuItem value={1}>Person</MenuItem>
                                    <MenuItem value={2}>Room</MenuItem>
                                </Select></Grid>
                                <Grid item xs={2}><Typography>summary</Typography></Grid>
                                
                                </Grid>
                                {renderlist()}
                            </Grid>

                            <Grid container item xs={4} spacing={1} direction="column" justify="flex-start" alignItems="flex-start">
                                <Grid item xs={4}>
                                    <Button onClick={filterData} color="primary" variant="contained">
                                        filter
                                </Button>
                                </Grid>
                                <Grid item xs={4}>
                                    <form>
                                        <Button onClick={checkRisk} color="primary" variant="contained">
                                            get risks
                                    </Button>
                                    </form>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>
                </div>
            }
        </div>
    );
}

export default Charts