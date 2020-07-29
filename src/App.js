import React from 'react';
import LandingPage from './Componnts/LandingPage/LandingPage'
import Home from "./Componnts/Home/Home"
import Login from './Componnts/Login/LoginForm'
import ProductPage from './Componnts/ProductPage/ProductPage'
import Cart from './Componnts/Cart/Cart'
import './App.css';
import { Router, Route, Switch } from "react-router-dom";
import GundamUnits from './gundum'
import { StoreContext } from './StoreContext'

function App() {
  const appValue = {
    inventory:GundamUnits,
    // cart:cartItems hooked up after database add a get funcyion for the data
}


  return (
    <StoreContext.Provider value={appValue}>
    <div className="App">
      <Switch>
        <Route exact path="/" >
          <LandingPage />
        </Route>
        <Route exact path="/login" >
          <Login />
        </Route>
        <Route exact path="/home" >
          <Home />
        </Route>
        <Route path="/about/foo" >

        </Route>
        <Route path="/about/bar" >
        </Route>
        <Route path="/item/:itemID" >
          <ProductPage />
        </Route>
        <Route path="/cart" >
          <Cart/>
        </Route>
        
      </Switch>
    </div>
    </StoreContext.Provider>
  );
}

export default App;
