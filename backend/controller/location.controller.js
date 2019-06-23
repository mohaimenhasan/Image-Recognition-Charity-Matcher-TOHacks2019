var firebase = require("firebase-admin");
var serviceAccount = require("../credentials.json");

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://tohacks2019-1561244898264.firebaseio.com"
});

const db = firebase.firestore();


exports.test = function (req, res) {
    res.send("Hello Darkness my old friend");
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