import React, { Component } from 'react'
import Header from './Header'
import { Link } from "react-router-dom";
import './landingpage.css'

export default class LandingPage extends Component {

    

    render() {
        return (
            <div>  
                <Header />
                <Link to={'/home'}><button class="Button" >HOME</button></Link>
                <br/>
            </div>
        )
    }
}
