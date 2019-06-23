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
                <a href="/user" class="btn btn-info" role="button" id="button">
                <img src='heart-box.png' alt='' className='icon'/>
                <div><p className='label'>I'm a Donor</p></div></a>
                <a href="/charity" class="btn btn-info" role="button" id="button"><img src='heart.png' alt='' className='icon'/>
                <p className='label'>I'm a Charity</p></a>
            </div>
        );
    }
}

export default Home;