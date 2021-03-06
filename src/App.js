import React, { Component } from 'react'
import LandingPage from './Componnts/LandingPage/LandingPage'
import Item from './Componnts/Home/Item';
import Logo from './Componnts/Logo/Logo'
import Login from './Componnts/Login/LoginForm'
import Cart from './Componnts/Cart/Cart'
import './App.css';
import { Route, Switch} from "react-router-dom";
import { StoreContext } from './StoreContext'
import Popup from "reactjs-popup";
import { withRouter } from 'react-router'
import {API_KEY} from './config'




class App extends Component {

  state = {
    showing: '',
    loggedIn:false,
    open:false,
    CartOpen:false, 
    LoggedInUser: {},
    numberofitems: 0,
    inventory: [],
    cart: [],
    addeditem: {
      userid: 0,
      itemid: 0,

    }
  }


LoginSucces=()=>{

  let sucess= this.state.showing
  sucess = 'none'
this.setState({
  showing:sucess
})
}

  componentDidMount() {
    fetch(`${API_KEY}inventory`)
      .then(response => response.json())
      .then(data => this.setState({ inventory: data }))  
  }



  

  fetchCart=()=>{
    const userid= this.state.LoggedInUser.id
    fetch(`${API_KEY}cart/${userid}`)
    .then(response => response.json())
    .then(data => this.setState({ cart: data.items }))

  }

  DeleteCartItem = (cartId) => {
    console.log('im fired')
    this.setState({
      ...this.state,
      cart: this.state.cart.filter((cart) => cart.id !== +cartId),
    });
  };

  getLoggedInUser = (user) => {
    fetch(`${API_KEY}users/${user}`)
      .then(response => response.json())
      .then(data => this.setState({ LoggedInUser: data.user }, this.fetchCart))

  }

  additem = (item, num) => {
    const newNum = num-1
    const filteredItems = this.state.cart.map(item =>{
       return item.itemid
    })
    const newAdddItem = this.state.addeditem
    newAdddItem.userid = this.state.LoggedInUser.id
    newAdddItem.itemid = item

    this.setState({
      addeditem: newAdddItem,
      numberofitems:newNum
    


    })

    if (newAdddItem.userid === undefined) {
      alert('login please')

    }
    else if (filteredItems.includes(newAdddItem.itemid)) {
      alert('ITEM ALREADY EXIST IN CART CHOOSE ANOTHER')

    }  else {
      fetch(`${API_KEY}cart/`, {
        method: 'POST',
        body: JSON.stringify(this.state.addeditem),
        headers: { 'content-type': 'application/json' }
      })
      .then(this.fetchCart)
      .then(  fetch(`${API_KEY}inventory/${item}`, {
        method: 'PATCH',
        body: JSON.stringify({numberofitems:newNum}),
        headers: { 'content-type': 'application/json' }
    }))
    
  
   




    }
  }


  openModal=()=>{
    this.setState({ open: true });
  }
  closeModal=()=>{
    this.setState({ open: false });
  }

  openCart=()=>{
    this.setState({ CartOpen: true });
  }
  closeCart=()=>{
    this.setState({ CartOpen: false },this.fetchCart);
    
  }
  

  render() {    
    const listedItem = this.state.inventory.map(item => (
      <div className='homeItemDiv'>
        <Item
          key={item.id}
          id={item.id}
          image={item.itemimage}
          price={item.price}
          itemName={item.name.toUpperCase()}
          description={item.description}
        
        />
        <button className='addButton' onClick={() => this.additem(item.id, item.numberofitems)}>additem</button>
      </div>
    ))


    const appValue = {
      emptyCart:this.clodeButton,
      forceLogIn:this.activateLogin,
      closeModal:this.closeModal,
      inventory: this.state.inventory,
      cart: this.state.cart,
      currentUser: this.state.LoggedInUser,
      deleteCartItem: this.DeleteCartItem,
      getLoggedInUser: this.getLoggedInUser,
      fetchCart:this.fetchCart,
      LoginSucces:this.LoginSucces
    }

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
             
              <div className='buttonDiv'>
              <div className='buttonInnerDiv'>
              <button className='loginButton' style={{display: this.state.showing}}onClick={this.openModal}>Login</button>
              <button  className='cartButton' onClick={this.openCart}>cart</button>
              </div>
              </div>
              <Popup open={this.state.open}
          closeOnDocumentClick
          onClose={this.closeModal} contentStyle={{width: "300px", borderRadius:'30px',}}  position="bottom center">
                  <Login />
              </Popup>
                <Popup open={this.state.CartOpen}
          closeOnDocumentClick
          onClose={this.closeCart} contentStyle={{width: "300px", height:'600px',borderRadius:'30px', overflow:'scroll' ,borderStyle:"solid", borderColor:'white',borderWidth:'10px'}} position="bottom center">
              <Cart />
              </Popup>
              
              <Logo />
              <div className='homeDiv'>
                {listedItem}  
                </div>
            </Route>

          </Switch>
        </div>
      </StoreContext.Provider>
    )
  }
}



export default withRouter(App)