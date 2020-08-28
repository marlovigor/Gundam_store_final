import React, { Component } from 'react'
import Header from './Header'
import { Link } from "react-router-dom";

export default class LandingPage extends Component {

    

    render() {
        return (
            <div>  
                <Header />
                <Link to={'/home'}>HOME</Link>
                <br/>
                <Link to={"/login"}>Login</Link>
            </div>
        )
    }
}
