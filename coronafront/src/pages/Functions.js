//Functions.js is a file to hold several functions which can be outsourced from the page codes to make the code cleaner

//filter rawdata by minutes
export const trimData = (rawdata) => {
    
        //filter list to provide datapoints only every 1 minute, scrap else
        const minTime = (data) => {
            let i;
            let min = data[0];
            for (i = 0; i < data.length; i++) {
    
                if (data[i].time < min.time) {
                    min = data[i]
                }
            }
        return min
        }

        let list = [];
        list.push(minTime(rawdata))
 
        for (let i = 0; i < rawdata.length - 1; i++) {
            //search for the minutes
            
            if (new Date(list[list.length-1].time/1000000).getMinutes() < new Date(rawdata[i].time/1000000).getMinutes() || new Date(list[list.length-1].time/1000000).getHours() < new Date(rawdata[i].time/1000000).getHours() ){
                list.push(rawdata[i])
            }  
    }
    console.log("TrimmedData length: " + list.length)
    console.log("Data first item: " + JSON.stringify(list[0]))
    console.log("---------------------------------------------") 
    return list
}

//Possible improvement to wrap several functions inside a main function
//function const riskSecs = (secs = 1) => { return{ checkRisk, checkRoomRisk, check}}

//modify risk check to check through routeData
export const checkRisk = (data, secs = 61) => {
    let risks = [];
    let i;

    console.log("Data length: " + data.length)
    console.log("Data first item: " + JSON.stringify(data[0]))
    console.log("---------------------------------------------") 

    //Starting the loop into the data.
    for (i = 0; i < data.length - 1; i++) {
        //Getting a date to compare to.
        let comparable = new Date(data[i].time / 1000000);
        //Initializing the integer being compared to
        let i2;


        //Looping i2 to be every object after i
        for (i2 = i + 1; i2 < data.length; i2++) {
            //may cause looong log!! //console.log("For loop initiated")

            // checking that i and i2 aren't the same person, checking for same room disabled because strings are always not equal.
            // checking room disabled since for whatever reason it always resulted in false, even when comparing room with itself.

            if (data[i].tagid != data[i2].tagid /* && data[i].room == data[i2].room */) {
                //console.log("tagID1: "+data[i].tagID+", tagID2: "+data[i2].tagID +", output: " + data[i].tagID != data[i2].tagID )

                //console.log("tags differ if condition met");
                //comparing if the two datapoints are within a certain number of seconds.
                if (Math.abs(comparable - new Date(data[i2].time / 1000000)) / 1000 < secs) {
                    console.log(" time points close enough if condition met ")
                    let distance = calcDist(data[i], data[i2]);
                   //console.log("56. if condition met");

                    //checking the distance, from the closest to the least close to account for risk from proximity.
                    if (distance < 1) {
                        console.log(" if condition met")
                        risks.push({ "dist": distance, "person1": data[i].tagID, "person2": data[i2].tagID, "time": new Date(data[i].time / 1000000), "room1": data[i].room, "room2": data[i2].room, "risk": "high" });
                    } else if (distance < 2) {
                        console.log("1 else if condition met")
                        risks.push({ "dist": distance, "person1": data[i].tagID, "person2": data[i2].tagID, "time": new Date(data[i].time / 1000000), "room1": data[i].room, "room2": data[i2].room, "risk": "medium" });
                    } else if (distance < 4) {
                        console.log("2 else if condition met")
                        risks.push({ "dist": distance, "person1": data[i].tagID, "person2": data[i2].tagID, "time": new Date(data[i].time / 1000000), "room1": data[i].room, "room2": data[i2].room, "risk": "low" });
                    }
                }
            }
        }
    }
//left some test logs for possible problems, most of tests are done with mocha at tests/test.js
/*  */   
    
    console.log("Risks length: " + risks.length)
    console.log("Risks first item: " + JSON.stringify(risks[0]))
    console.log("---------------------------------------------") 
    return risks;
}

export const checkRoomRisk = (data, room, secs = 1) => {
    let i;
    let roomrisk = "";

    let lowrisk = 0;
    let medrisk = 0;
    let highrisk = 0;

    //Starting the loop into the data.
    for (i = 0; i < data.length - 1; i++) {

        //Getting a date to compare to.
        let comparable = new Date(data[i].time / 1000000);

        //Initializing the integer being compared to
        let i2;

        //skipping cases where person 1 is not in the room we are checking
        if (data[i].room === room) {

            //Looping i2 to be every object after i
            for (i2 = i + 1; i2 < data.length; i2++) {

                //skipping cases where person 2 is not in the room we are checking
                if (data[i2].room === room) {

                    // checking that i and i2 aren't the same person.
                    if (data[i].tagID !== data[i2].tagID) {

                        //comparing if the two datapoints are within a certain number of seconds.
                        if (Math.abs(comparable - new Date(data[i2].time / 1000000)) / 1000 < secs) {

                            // calculating the distance
                            let distance = calcDist(data[i], data[i2]);
                            //checking the distance, from the closest to the least close to account for risk from proximity.
                            if (distance < 1) {
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
    const totalrisk = lowrisk + medrisk + highrisk;

    roomrisk = "We had a total of " + totalrisk + " encounters. " + highrisk + " of them were high risk, " + medrisk + " of them were medium risk, and " + lowrisk + " of them were low risk."


    if (highrisk > (totalrisk / 2)) {
        roomrisk = roomrisk + " The riskyness of the room is high, there's some spot where people like to get real close."
    } else if (lowrisk > (totalrisk / 2)) {
        roomrisk = roomrisk + " The riskyness of the room is quite low, people may like to be here, but not too close to each other."
    }

    return roomrisk;
}

//modify risk check to check through routeData
export const checkOneRisk = (data, tagID, secs = 1) => {
    let i;
    let individualrisk = [];

    //Starting the loop into the data.
    for (i = 0; i < data.length - 1; i++) {

        //Getting a date to compare to.
        let comparable = new Date(data[i].time / 1000000);

        //Initializing the integer being compared to
        let i2;

        //Looping i2 to be every object after i
        for (i2 = i + 1; i2 < data.length; i2++) {

            // checking that i is the person we're checking, that i and i2 aren't the same person, and that they are in the same room.
            if (data[i].tagID === tagID && data[i].tagID !== data[i2].tagID && data[i].room === data[i2].room) {

                //comparing if the two datapoints are within a certain number of seconds.
                if (Math.abs(comparable - new Date(data[i2].time / 1000000)) / 1000 < secs) {
                    let distance = calcDist(data[i], data[i2]);

                    //checking the distance, from the closest to the least close to account for risk from proximity.
                    if (distance < 1) {
                        individualrisk.push({ "dist": distance, "person2": data[i2].tagID, "time": new Date(data[i].time / 1000000), "risk": "high" });
                    } else if (distance < 2) {
                        individualrisk.push({ "dist": distance, "person2": data[i2].tagID, "time": new Date(data[i].time / 1000000), "risk": "medium" });
                    } else if (distance < 4) {
                        individualrisk.push({ "dist": distance, "person2": data[i2].tagID, "time": new Date(data[i].time / 1000000), "risk": "low" });
                    }
                }
            }
        }
    }
/*     console.log(individualrisk);
    console.log("---------------------------------------------") */
    return individualrisk;
}

export const calcDist = (posit1, posit2) => {
    let dist1 = Math.pow((posit1.x - posit2.x), 2)
    let dist2 = Math.pow((posit1.y - posit2.y), 2)

    return Math.sqrt(Math.abs(dist1 + dist2))
}