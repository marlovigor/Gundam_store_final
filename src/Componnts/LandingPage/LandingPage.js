import React, { Component } from 'react'
import Header from './Header'
import { Link, Router } from "react-router-dom";
import './landingpage.css'
import Popup from "reactjs-popup";
import { createBrowserHistory } from "history";



export default class LandingPage extends Component {



    render() {
        const history = createBrowserHistory();
        return (
            
            <div>
                <Router history={history}>
               
                <Header />

                <Link to={'/home'}><button class="Button" >HOME</button></Link>
                <br />
                <Popup trigger={<button>Instructions</button>} closeOnDocumentClick contentStyle={{ width: "80%", borderRadius: '30px', backgroundColor: 'black', padding: '33px'}} position="bottom center">
                    <span>Hello, Once you open your home page use login and enter the pre-disired login info to selct an account yo begin shopping with, from
                    there on out you can select products and add them to you cart and also remove them from your cart, once your item is selcted from the cart it is then removed from our inventor so that
                        onelse can clain your item, but hurry up while supplies Last.</span>
                </Popup>
                </Router>
            </div>
          
        )
    }
}
