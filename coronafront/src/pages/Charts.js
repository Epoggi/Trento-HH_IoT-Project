import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Scatter } from 'react-chartjs-2';
import DateTimePicker from 'react-datetime-picker';
import { Button } from '@material-ui/core';
import DataJson from '../data/csvjson.json'
import * as Functions from './Functions'
import { CSVLink } from "react-csv";
import CSVReader from "react-csv-reader";

//drawer komponentit
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

//Summary list komponentti
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';



function Charts() {
    
    const [uploadData, setUploadData] = React.useState()

    const handleData = (data, fileInfo) => setUploadData(data);
    
    const papaparseOptions = {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      transformHeader: header => header.toLowerCase().replace(/\W/g, "_")
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
        let thisdata = trimmedData.filter(trimmedData => earliest <= new Date(trimmedData.time / 1000000));
        thisdata = thisdata.filter(thisdata => latest >= new Date(thisdata.time / 1000000));
        setReadyData(thisdata);
    }

/*     const calcDist = (posit1, posit2) => {
        let dist1 = Math.pow((posit1.x - posit2.x), 2)
        let dist2 = Math.pow((posit1.y - posit2.y), 2)

        return Math.sqrt(Math.abs(dist1 + dist2))
    } */

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

    const [risk, setRisk] = React.useState([])
//material ui demo ->
    function generate() {
        return risk.map((el => {
            return <ListItem primaryText={el.dist} key={el.dist}/>
        }),
        );
      }

    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);

    const renderlist = () => {
        return (
        <div>
            <List dense={dense}>
              {generate()}
            </List>
        </div>
        )} 
    /* _renderTodos(){
    return this.state.todos.map(el => {
        return <ListItem primaryText={el.text} key={el.id}/>
    })
}

render(){
    return(
        <MobileTearSheet>
            <List>
                {this._renderTodos()}
            </List>
        </MobileTearSheet>
    )
} */
//material ui demo end.

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

export default Charts