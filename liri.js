require("dotenv").config();
let keys = require("./keys.js");
let inquirer = require("inquirer");
let axios = require("axios");
let moment = require('moment');

let spotify = keys.spotify;
// console.log(spotify);
let omdb = keys.ombd;
// console.log(omdb);

let bandsInTown = keys.bandsInTown;
// console.log(bandsInTown);

function initCommand() {
    inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "I am LIRI, I can do several things for you.  Please select from the list of my available commands.",
            choices: ["Concert this", "Spotify this song", "Movie this", "Do what I say"]
        }
    ]).then(function (answers) {
        let action = answers.choice;
        switch (action) {
            case "Concert this":
                concertThis();
                break;

            case "Spotify this song":
                spotifyThis();
                break;

            case "Movie this":
                movieThis();
                break;

            case "Do what I say":
                doThis();
                break;
        }


    });
}
function concertThis() {
    inquirer.prompt([
        {
            type: "input",
            name: "band",
            message: "Which artist/band's upcomming concert information would you like?.",
        }
    ]).then(function (answers) {
        let band = answers.band.replace(/ /g, "%20");;
        // console.log(band);
        let appId = "app_id=" + bandsInTown.appID;
        // console.log(appId);
        let url = "https://rest.bandsintown.com/artists/" + band + "/events?" + "app_id=" + appId;
        // console.log(url);
        axios.get(url).then(
            function (response) {
                let eventArrary = response.data;
                switch (!eventArrary || !eventArrary.length) {
                    case true:
                        console.log("---------------", "\nThis Artist or Band doesn't have any Concerts currently", "\n---------------");
                        setTimeout(function () { initCommand(); }, 1500);
                        break;
                    default:
                        let venueArrary = [];
                        eventArrary.forEach(i => {
                            let eventObj = {};
                            eventObj.venue = i.venue.name;
                            // console.log("Venue Name:",venue);
                            eventObj.locCity = i.venue.city;
                            // console.log("Venue City:",locCity);
                            eventObj.locCountry = i.venue.country
                            // console.log("Venue Country:",locCountry);
                            eventObj.eventDate = moment(i.datetime).format("MM/DD/YYYY");
                            // console.log(eventDate);
                            venueArrary.push(eventObj);
                            // console.log(JSON.stringify(eventObj));
                            // console.log(JSON.stringify(venueArrary));
                        });
                        // console.log(venueArray);
                        venueArrary.forEach(i => {
                            console.log("Venue Name:", i.venue, "\nLocation:", i.locCity + "," + i.locCountry, "\nEvent Date:", i.eventDate);
                            console.log("---------------");
                        });
                        setTimeout(function () { initCommand(); }, 1500);
                        break;
                }
            }).catch(function (error) {
                console.log("---------------","\nThis is not a valid Artist/Band.  \nPlease enter the band name again.", "\n---------------");
                
                setTimeout(function () { concertThis(); }, 1500);
            });
    });
};

function spotifyThis() {
    switch (answer === "") {
        case true:

            break;

        default:
            let artists = [];
            let song = "";
            let songURL = "";
            let album = "";
            break;
    }




};

function movieThis() {

};
function doThis() {

};

initCommand();
