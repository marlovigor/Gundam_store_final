import React, { Component } from 'react'
import LandingPage from './Componnts/LandingPage/LandingPage'
import Home from "./Componnts/Home/Home"
import Item from './Componnts/Home/Item';
import Logo from './Componnts/Logo/Logo'
import SearchBar from './Componnts/Home/SearchBar'
import Login from './Componnts/Login/LoginForm'
import ProductPage from './Componnts/ProductPage/ProductPage'
import Cart from './Componnts/Cart/Cart'
import './App.css';
import { Router, Route, Switch, BrowserRouter } from "react-router-dom";
import GundamUnits from './gundum'
import { StoreContext } from './StoreContext'
import base64 from 'react-native-base64'
import { withRouter } from 'react-router'


 class App extends Component {

  state = {
    LoggedInUser: {},
    numberofitems: 3,
    inventory: [],
    cart: [],
    addeditem:{
      userid:0,
      itemid:0,
      
    }
  }


  // componentWillMount() {
  //   this.setState({
  //     carts:this.state.cart
  //   })
  // }

  componentDidMount() {
    console.log('app mounted')
    fetch('http://localhost:8000/inventory')
      .then(response => response.json())
      .then(data => this.setState({ inventory: data }))
    fetch('http://localhost:8000/cart/1')
      .then(response => response.json())
      .then(data => this.setState({ cart: data }))
    console.log('app mounted')
  }



  getLoggedInUser = (user) => {
    fetch(`http://localhost:8000/users/${user}`)
      .then(response => response.json())
      .then(data => this.setState({ LoggedInUser: data.user }))

  }

  additem=(item)=>{
    const newAdddItem = this.state.addeditem
    newAdddItem.userid = this.state.LoggedInUser.id
    newAdddItem.itemid = item
    // const filteredNumbers = this.state.inventory.filter(item => item.id == item)
    // const number = filteredNumbers.numberofitems
    console.log(item)
    

    this.setState({
      addeditem:newAdddItem

    })
    // console.log(this.state.LoggedInUser.id)
    // console.log(newAdddItem)
    if( newAdddItem.userid === undefined){
      this.props.history.push('/login')

    }else{
      fetch('http://localhost:8000/cart/', {
            method: 'POST',
            body: JSON.stringify(this.state.addeditem),
            headers: { 'content-type': 'application/json' }
        })
        fetch('http://localhost:8000/inventory/3', {
            method: 'PATCH',
            body: JSON.stringify({numberofitems:this.state.numberofitems}),
            headers: { 'content-type': 'application/json' }
        })

    }
    console.log(this.state.numberofitems)


  }

  render() {

    const listedItem = this.state.inventory.map(item => (
      <div>
      <Item
        key={item.id}
        id={item.id}
        image={item.itemimage}
        price={item.price}
        itemName={item.name.toUpperCase()}
        description={item.description}
        // onClick={this.additem(item.id)}
      />
      <button onClick={() => this.additem(item.id)}>additem</button>
      </div>
    ))


    // const decode = Base64.decode(window.localStorage.ecom_key)

    
    // console.log(this.context.inventory)
    const appValue = {
      inventory: this.state.inventory,
      cart: this.state.cart,
      currentUser: this.state.LoggedInUser,
      getLoggedInUser: this.getLoggedInUser
    }
    // console.log(this.state.inventory)
    return (
      <StoreContext.Provider value={appValue}>
        <div className="App">
          <Switch>
            <Route exact path="/" >
              <LandingPage />
            </Route>
            <Route path="/login" >
              <Login />
            </Route>
            <Route path="/home" >
              <div className="App">
                <Logo />
                <SearchBar />
                {listedItem}
              </div>
            </Route>
            <Route path="/about/foo" >
            </Route>
            <Route path="/about/bar" >
            </Route>
            <Route path="/home/:itemID" component={ProductPage}>
              <ProductPage />
            </Route>
            <Route path="/cart" component={Cart}>
              <Cart />
            </Route>

          </Switch>
        </div>
      </StoreContext.Provider>
    )
  }
}


export default withRouter(App)