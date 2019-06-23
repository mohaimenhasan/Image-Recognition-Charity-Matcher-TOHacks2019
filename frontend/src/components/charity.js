import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import fetch from 'node-fetch';
const api_base_url= "http://localhost:8888/location";

class SignUp extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            address:'',
            apt:'',
            city:'',
            province:'',
            country:''
        }
    }

    handleNameChange = (event) => {
        this.setState({
            name: event.target.value,
        });
    };

    handleAddressChange = (event) => {
        this.setState({
            address: event.target.value,
        });
    };
    handleAptChange = (event) => {
        this.setState({
            apt: event.target.value,
        });
    };
    handleCityChange = (event) => {
        this.setState({
            city: event.target.value,
        });
    };
    handleProvinceChange = (event) => {
        this.setState({
            province: event.target.value,
        });
    };
    handleCountryChange = (event) => {
        this.setState({
            country: event.target.value,
        });
    };
    handleClick(event){
        let apiUrl = api_base_url+'/add_charity';
        let self = this;
        console.log(this.state);

        if(this.state.name.length>0 && this.state.address.length>0 && this.state.city.length>0 && this.state.province.length>0 && this.state.country.length>0){
            fetch(apiUrl,
                {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": '*'
                    },
                    body: JSON.stringify({
                            name: this.state.name,
                            address: this.state.address,
                            apt: this.state.apt,
                            city: this.state.city,
                            province: this.state.province,
                            country: this.state.country
                        }
                    )
                }).then(my_resp => my_resp.json())
                .then(response =>{
                    console.log(response);
                    if(response["code"] === 200){
                        alert("Charity created successfully");
                        window.location.href = ('http://localhost:3000/')
                    }
                    else{
                        console.log("Some error occurred: ",response.data.code);
                    }
                }).catch(function (error) {
                console.log(error);
            });
        }
        else{
            console.log(this.state.name.length>0);
            console.log(this.state.address.length>0);
            console.log(this.state.city.length>0);
            console.log(this.state.province.length>0);
            console.log(this.state.country.length>0);
            alert("Input field value is missing");
        }
    }
    componentWillReceiveProps(nextProps){
        console.log("nextProps",nextProps);
    }
    render() {
        return(
            <div style={{
                marginTop: "3%",
                marginLeft: "38%",
                position: "center",
                alignItems: "center",
                width: "25%"
            }}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Charity Name"
                    name="name"
                    autoFocus
                    onChange={this.handleNameChange}
                />
                <br/>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="address"
                    label="Address"
                    name="address"
                    autoFocus
                    onChange={this.handleAddressChange}
                />
                <br/>
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="apt"
                    label="Apt."
                    name="apt"
                    autoFocus
                    onChange={this.handleEmailChange}
                />
                <br/>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="city"
                    label="City/Town"
                    name="city"
                    autoFocus
                    onChange={this.handleCityChange}
                />
                <br/>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="province"
                    label="Province/State"
                    id="provice"
                    autoFocus
                    onChange={this.handleProvinceChange}
                />
                <br/>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="country"
                    label="Country"
                    id="country"
                    autoFocus
                    onChange={this.handleCountryChange}
                />
                <br/>
                <Button variant="contained" color="primary" onClick={(event) => this.handleClick(event,this.props.role)} style={{
                    marginTop: "5%",
                    marginLeft: "30%"
                }}>
                    Sign Up
                </Button>
            </div>
        )
    }
}

const style = {
    margin: 15,
};


export default SignUp;