var firebase = require("firebase-admin");
var serviceAccount = require("../credentials.json");
// Imports the Google Cloud client libraries
const vision = require('@google-cloud/vision');
const fs = require('fs');
// Creates a client
const client = new vision.ImageAnnotatorClient();


firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://tohacks2019-1561244898264.firebaseio.com"
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
    objects.forEach(object => {
        console.log(`Name: ${object.name}`);
        console.log(`Confidence: ${object.score}`);
        const vertices = object.boundingPoly.normalizedVertices;
        vertices.forEach(v => console.log(`x: ${v.x}, y:${v.y}`));
    });
    res.send("Done");
};


exports.add_user = async function (req, res) {
    let docRef = db.collection('users').doc(req.body.first+req.body.last);
    await docRef.set({
        first: req.body.first,
        last: req.body.last,
        interests: req.body.interests
    }).then( () => {
        console.log("Database Updated");
        res.send("User has been added");
    });
};