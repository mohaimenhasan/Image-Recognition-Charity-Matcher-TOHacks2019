exports.test = function (req, res) {
    res.send("Hello Darkness my old friend");
}


exports.something = function (req, res){
    res.send("Something");
}


exports.getCharitiesList = function (req, res) {
    // base_url='https://maps.googleapis.com/maps/api/place/findplacefromtext/output?parameters'
    const googleMapsClient = require('@google/maps').createClient({
        key: 'AIzaSyClGuqvS5S9nLZiy6oxMgEa8n1UfYCtOBw'
    });
    googleMapsClient.findPlace({
        input: 'Ryerson University',
        inputtype: 'textquery'
    }, function(err, response) {
        if (!err) {
            res.send(response.json.results);
        }
    });
}