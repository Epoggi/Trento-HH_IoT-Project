import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Scatter } from 'react-chartjs-2';
import DateTimePicker from 'react-datetime-picker';
import { Button } from '@material-ui/core';
import DataJson from '../data/csvjson.json'
import * as Functions from './Functions'

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
  

    //Functions.

    const [readyData, setReadyData] = React.useState([]);

    const trentodata = DataJson;
    const [trimmedData, setTrimmedData] = React.useState([]);
    useEffect(() => { setTrimmedData(Functions.trimData(trentodata)) }, []);  
  
    //{overall risk levels, close contact situations, directional contact:[{face to face, shoulder to shoulder, ...}]}
    const summary = []

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

    let roomrisk = "";

    let individualrisk = [];

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
                                        <Button onClick={ console.log(Functions.checkRisk(readyData))} color="primary" variant="contained">
                                            get risks
                                    </Button>
                                    </form>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>
                </div>
            
        </div>
    );
}

export default Charts