//function const riskSecs = (secs = 1) => { return{ checkRisk, checkRoomRisk, check}}
//modify risk check to check through routeData
export const checkRisk = (data, secs = 1) => {
    let risks = [];
    let i;

    //Starting the loop into the data.
    for (i = 0; i < data.length - 1; i++) {
        console.log("I: " + i);
        //Getting a date to compare to.
        let comparable = new Date(data[i].time / 1000000);
        console.log("Comparable: " + comparable);
        //Initializing the integer being compared to
        let i2;


        //Looping i2 to be every object after i
        for (i2 = i + 1; i2 < data.length; i2++) {
            //console.log("I2: " + i2);
            //console.log("Duplicate: " + data[i].tagID != data[i2].tagID);
            //console.log("Room1:" + new String(data[i].room).normalize() + " Room2:" + new String(data[i2].room).normalize());
            console.log("Same room: " + new String(data[i].room).normalize().trim() == new String(data[i2].room).normalize().trim());
            console.log("Type of room1:" + typeof data[i].room + ", Room: " + data[i].room)
            console.log("Type of room2:" + typeof data[i2].room + ", Room: " + data[i].room)

            // checking that i and i2 aren't the same person and that they are in the same room.
            if (data[i].tagID != data[i2].tagID && data[i].room == data[i2].room) {
                console.log("Compared to: " + new Date(data[i2].time / 1000000));
                console.log("time comparison: " + Math.abs(comparable.getTime() - new Date(data[i2].time / 1000000)) / 1000);

                //comparing if the two datapoints are within a certain number of seconds.
                if (Math.abs(comparable - new Date(data[i2].time / 1000000)) / 1000 < secs) {
                    let distance = calcDist(data[i], data[i2]);
                    console.log("Distance: " + distance);
                    console.log("-----");

                    //checking the distance, from the closest to the least close to account for risk from proximity.
                    if (distance < 1) {
                        risks.push({ "dist": distance, "person1": data[i].tagID, "person2": data[i2].tagID, "time": new Date(data[i].time / 1000000), "risk": "high" });
                    } else if (distance < 2) {
                        risks.push({ "dist": distance, "person1": data[i].tagID, "person2": data[i2].tagID, "time": new Date(data[i].time / 1000000), "risk": "medium" });
                    } else if (distance < 4) {
                        risks.push({ "dist": distance, "person1": data[i].tagID, "person2": data[i2].tagID, "time": new Date(data[i].time / 1000000), "risk": "low" });
                    }
                }
            }
        }
    }
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
                    if (data[i].tagID != data[i2].tagID) {

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
            if (data[i].tagID === tagID && data[i].tagID != data[i2].tagID && data[i].room === data[i2].room) {

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
    console.log(individualrisk);
    console.log("---------------------------------------------")
    return individualrisk;
}

//mahd. spread notaatio. Laskeminen for loopin sisällä. HashMap, hajautus algoritmi.
/* 
const [earliest, setEarliest] = React.useState(new Date(Math.min(...trentodata.map(e => new Date(e.time/1000000)))));
const [latest, setLatest] = React.useState(new Date(Math.max(...trentodata.map(e => new Date(e.time/1000000))))); 
*/

export const filterData = (trentodata, earliest, latest) => {
    let thisdata = trentodata.filter(trentodata => earliest <= new Date(trentodata.time / 1000000));
    thisdata = thisdata.filter(thisdata => latest >= new Date(thisdata.time / 1000000));
    return thisdata;
}

export const calcDist = (posit1, posit2) => {
    let dist1 = Math.pow((posit1.x - posit2.x), 2)
    let dist2 = Math.pow((posit1.y - posit2.y), 2)

    return Math.sqrt(Math.abs(dist1 + dist2))
}