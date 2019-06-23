import React, { Component } from 'react';
import '../App.css';

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
        };
    }

    render() {
        return (
            <div style={{ "width": "100%" , "alignContent":"center", "height":"500px"}}>
                <a href="/user" class="btn btn-info" role="button" id="button">I'm a Donor</a>
                <a href="/charity" class="btn btn-info" role="button" id="button">I'm a Charity</a>
            </div>
        );
    }
}

export default Home;