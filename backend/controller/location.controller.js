var firebase = require("firebase-admin");
var serviceAccount = require("../credentials.json");
const fs = require('fs');
let rawdata = fs.readFileSync(__dirname+'/sample.json');
let sample = JSON.parse(rawdata);
//console.log(sample);

// Imports the Google Cloud client libraries
const vision = require('@google-cloud/vision');
// Creates a client
const client = new vision.ImageAnnotatorClient();

var maps = require('@google/maps');

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://tohacks2019-1561244898264.firebaseio.com"
});
const googleMapsClient = require('@google/maps').createClient({
    key: process.env.GOOGLE_MAPS_API_KEY,
    Promise: Promise
});

const db = firebase.firestore();

exports.test = function (req, res) {
    res.send("Hello Darkness my old friend");
};

exports.return_image_tag = async function (req, res){
    const fileName = __dirname+'/'+req.body.image_name;
    const request = {
        image: {content: fs.readFileSync(fileName)},
    };
    const [result] = await client.objectLocalization(request);
    const objects = result.localizedObjectAnnotations;
    let objs_to_return = [];
    objects.forEach(object => {
        objs_to_return.push({
            name: object.name,
            confidence: object.score
        });
        const vertices = object.boundingPoly.normalizedVertices;
        vertices.forEach(v => console.log(`x: ${v.x}, y:${v.y}`));
    });
    console.log(objs_to_return);
    res.send(objs_to_return);
};


exports.add_user = async function (req, res) {
    let docRef = db.collection('users').doc(req.body.first+req.body.last);
    await docRef.set({
        first: req.body.first,
        last: req.body.last,
        email: req.body.email,
        password: req.body.password,
        interests: req.body.interests
    }).then( () => {
        console.log("Database Updated");
        res.send({
            "code": 200,
            "Message": "New user created successfully"
        });
    });
};

exports.match_category = async function(req, res){
    try{
        var latlon = [req.body.latitude,req.body.longitude];
        let rad = parseInt(req.body.radius);
        await get_charities(latlon, rad)
            .then(data=>{
                let places = [];
                for (let i=0; i < sample.length; i++){
                    for (let key in sample[i]){
                        for (let element in sample[i][key]){
                            console.log(req.body.obj_type);
                            if (req.body.obj_type === sample[i][key][element]){
                                console.log("it matched here");
                                for (let k=0; k < data.length; k++){
                                    for (let m=0; m < data[i].type.length; m++){
                                        if (data[i].type[m] === key){
                                            if (!places.includes(data[i]))
                                                {places.push(data[i]);}
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                console.log(places);
                res.send(places);
            })

    }catch (e) {

    }
};

async function get_charities(latlon, rad){
    try{
        return await googleMapsClient.placesNearby({
            location: latlon,
            radius: rad,
            keyword: 'Donation'
        }).asPromise()
            .then(response=>{
                //console.log(response.json.results);
                let resp=[];
                for(let i=0; i < response.json.results.length; i++){
                    resp.push({
                        name: response.json.results[i].name,
                        type: response.json.results[i].types,
                        rating: response.json.results[i].rating,
                        address: response.json.results[i].vicinity+', '+response.json.results[i].plus_code.compound_code,
                        icon: response.json.results[i].icon,
                        location: response.json.results[i].geometry.location
                    });
                }
                return resp;
            }).catch((err) => {
                throw(err);
            });
    }catch (e) {
        console.log(e);
    }
}

exports.get_charities = async function(req, res){
    try{
        var latlon = [req.body.latitude,req.body.longitude];
        console.log(latlon);
        let rad = parseInt(req.body.radius);
        await get_charities(latlon, rad)
            .then(my_charties => {
                res.send(my_charties);
            })
    }catch (e) {
        console.log(e);
    }
}
