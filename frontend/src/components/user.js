import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {red} from "@material-ui/core/colors";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import {GoogleApiWrapper, Map, Marker} from "google-maps-react";

class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            photo: {},
            file: '',
            image: [],
            objects: [],
            display_image_tag: 'None',
            display_choose: '',
            all_image_tags: [],
            display_charity: 'None',
            display_donate: '',
            curr_lat: '',
            curr_lon: '',
            nearby_coordinate: [],
            markers: [],
            radius: 20000,
            place_data: []
        };

        this.getMyLocation = this.getMyLocation.bind(this)
        this.loadFile = this.loadFile.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.getMyLocation()
    }

    getMyLocation() {
        const location = window.navigator && window.navigator.geolocation;

        if (location) {
            location.getCurrentPosition((position) => {
                this.setState({
                    curr_lat: position.coords.latitude,
                    curr_lon: position.coords.longitude,
                });
            }, (error) => {
                this.setState({ latitude: 'err-latitude', longitude: 'err-longitude' })
            })
        }

    }

    handleSubmit(event) {
        console.log('photo received: ', event.target.files[0].name);
        this.setState({
            photo: event.target.files[0]
        });
    }

    async getNearbyCharity(){
        let apiUrl = 'http://localhost:8888/location/match_category';
        console.log("here -2")
        fetch(apiUrl,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": '*'
                },
                body: JSON.stringify({
                        latitude: this.state.curr_lat,
                        longitude: this.state.curr_lon,
                        radius: this.state.radius,
                        obj_type: this.state.objects[0]
                    }
                )
            }).then(my_resp => my_resp.json())
            .then(data => {
                console.log(data);
                let place=[];
                let markers = [];
                let place_data=[];
                for(let i=0; i < data.length; i++){
                    markers.push(
                        <Marker
                            title={data[i].name}
                            name={data[i].name}
                            position={{lat: data[i].location.lat, lng: data[i].location.lng}}
                        />
                    );
                    let list_items=[];
                    for (let j=0; j < data[i].type.length; j++){
                        list_items.push(
                            <ListItem>
                                <Typography>
                                    {data[i].type[j]}
                                </Typography>
                            </ListItem>
                        )
                    }
                    place_data.push(
                        <div style={{ display: 'inline-block', borderStyle: 'solid',
                            borderWidth: 2, margin: '2%'}}>
                            <Card style={{
                                width: "100%",
                                textAlign: "center",
                                backgroundColor: "#a8ff78"
                            }}>
                                <CardContent>
                                    <Typography>
                                        <b> Name: </b> {data[i].name}
                                    </Typography>
                                </CardContent>
                            </Card>
                            <Card style={{
                                width: "100%",
                                textAlign: "center",
                                backgroundColor: "#78ffd6"
                            }}>
                                <CardContent>
                                    <Typography variant="h6" component="h2">
                                        Donation Itineraries
                                    </Typography>
                                    <list>
                                        {list_items}
                                    </list>
                                </CardContent>
                            </Card>
                        </div>
                    );
                    place.push(data[i]);
                }
                this.setState({
                    place_data: place_data,
                    markers: markers,
                    nearby_coordinate: place
                })
            })
    }
    async handleCharities(event){
          await this.getNearbyCharity()
              .then( () => {
                  this.setState({
                      display_charity: '',
                      display_donate: 'None'
                  })
              })
    }
    loadFile(event){

        console.log('photo received-1: ', event.target.files[0].name);
        this.setState({
            photo: event.target.files[0]
        });
        let apiUrl ="http://localhost:8888/location/return_image_tag";
            fetch(apiUrl,
                {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": '*'
                    },
                    body: JSON.stringify({
                            image_name: event.target.files[0].name
                        }
                    )
                }).then(my_resp => my_resp.json())
                .then(response =>{
                    console.log(response);
                    let img = [];
                    let objs = [];
                    for(let i=0; i < response.length && i < 3; i++){
                        objs.push(response[i].name);
                        img.push(
                            <ListItem>
                                <ListItemText primary={response[i].name}/>
                            </ListItem>
                        );
                    }
                    this.setState({
                        objects: objs,
                        image: img,
                        display_image_tag: '',
                        display_choose: 'None'
                    })

                }).catch(function (error) {
                console.log(error);
            });
        };


    render(){
        return (
            <div>
                <div style={{
                    display: this.state.display_donate
                }}>
                    <Card style={{
                        position: "center",
                        width: "30%",
                        display: "inline-block",
                        height: '20vw',
                        marginLeft: "35%",
                        marginTop: "3%",
                        textAlign: "center",
                        backgroundColor: "#FA9A85"
                    }}>
                        <CardHeader
                            avatar={
                                <Avatar style={{
                                    backgroundColor: red[500]
                                }}>
                                    U
                                </Avatar>
                            }
                            title="Upload to donate today"
                        />
                        <CardContent>
                            <Typography variant="h4" component="h2">
                                Welcome to Add Item
                            </Typography>
                            <form style={{
                                marginTop: "5%",
                                fontSize: 20,
                            }} onSubmit={this.handleSubmit}>
                                Upload An Image Below:
                                <input type="file" accept="image/*" name="image" id="file" onChange={this.loadFile} style={{"display": "none"}}></input>
                                <br/><label className='btn btn-primary' htmlFor="file" style={{"cursor": "pointer", marginTop: "5%"}}>Choose
                                File</label>
                                {/* <p><img id="output" width="200" alt='upload' /></p> */}
                            </form>
                        </CardContent>
                    </Card>
                    <Card style={{
                        position: "center",
                        width: "30%",
                        display: this.state.display_image_tag,
                        marginLeft: "35%",
                        marginTop: "2%",
                        textAlign: "center",
                        backgroundColor: "#FA9A85"
                    }}>
                        <CardContent>
                            <Typography variant="h4" component="h2">
                                The Following Items Have Been Found Donate-able:
                            </Typography>
                            <List>
                                {this.state.image}
                            </List>
                        </CardContent>
                    </Card>
                    <Button variant="contained" color="primary" onClick={(event) => this.handleCharities(event)} style={{
                        display: this.state.display_image_tag,
                        marginTop: "1%",
                        marginLeft: "46%"
                    }}>
                        Find Charities
                    </Button>
                </div>
                <div style={{
                    display: this.state.display_charity,
                    marginLeft: '5%'
                }}>

                    {this.state.place_data}
                    <Map
                        google={this.props.google}
                        zoom={14}
                        style={mapStyles}
                        initialCenter={{ lat: 43.646202, lng: -79.385963}}
                    >
                        {this.state.markers}
                    </Map>
                </div>
            </div>
        );
    }
}

const mapStyles = {
    width: '70%',
    height: '92%',
    marginTop: '5%',
    marginLeft: '15%',
    borderStyle: 'solid',
    borderWidth: 5
};

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_API_KEY
})(User);