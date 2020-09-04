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




class App extends Component {

  state = {
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


  // componentWillMount() {
  //   this.setState({
  //     carts:this.state.cart
  //   })
  // }

  componentDidMount() {
    fetch('http://localhost:8000/inventory')
      .then(response => response.json())
      .then(data => this.setState({ inventory: data }))  
  }

  fetchCart=()=>{
    const userid= this.state.LoggedInUser.id
    console.log(userid)
    fetch(`http://localhost:8000/cart/${userid}`)
    .then(response => response.json())
    .then(data => this.setState({ cart: data.items }))

  }

  // openClose=(e)=>{
    
  //     this.setState({
  //       open:!this.state.open
  //     }) 
    
  // }
  // openLogin=(e)=>{
  //     this.setState({
  //       loggedIn:!this.state.loggedIn
  //     })
    

  // }

  // activateLogin=(e)=>{
  //   this.setState({
  //     loggedIn:true
  //   })

  // }


  // clodeButton=(e)=>{
  //   this.setState({
  //     open:false
  //   })
  // }


  getLoggedInUser = (user) => {
    fetch(`http://localhost:8000/users/${user}`)
      .then(response => response.json())
      .then(data => this.setState({ LoggedInUser: data.user }, this.fetchCart))

  }

//  patchCart=(item)=>{
//    console.log('pacheted')
//    console.log(item)
//    console.log(this.state.numberofitems)
//   fetch(`http://localhost:8000/inventory/${item}`, {
//     method: 'PATCH',
//     body: JSON.stringify({numberofitems:this.state.numberofitems}),
//     headers: { 'content-type': 'application/json' }
// })
//   }

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
    // console.log(this.state.LoggedInUser.id)
    // console.log(newAdddItem)
    if (newAdddItem.userid === undefined) {
      alert('login please')

    }
    else if (filteredItems.includes(newAdddItem.itemid)) {
      // console.log(newAdddItem.itemid)
      // console.log(this.state.cart.itemid)
      alert('ITEM ALREADY EXIST IN CART CHOOSE ANOTHER')

    }  else {
      fetch('http://localhost:8000/cart/', {
        method: 'POST',
        body: JSON.stringify(this.state.addeditem),
        headers: { 'content-type': 'application/json' }
      })
      .then(this.fetchCart)
      .then(  fetch(`http://localhost:8000/inventory/${item}`, {
        method: 'PATCH',
        body: JSON.stringify({numberofitems:newNum}),
        headers: { 'content-type': 'application/json' }
    }))
    
    console.log(item)
    console.log(newNum)
   




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
    this.setState({ CartOpen: false });
  }
  

  render() {

    
    const listedItem = this.state.inventory.map(item => (
      <div class='homeItemDiv'>
        <Item
          key={item.id}
          id={item.id}
          image={item.itemimage}
          price={item.price}
          itemName={item.name.toUpperCase()}
          description={item.description}
        // onClick={this.additem(item.id)}
        />
        <button class='addButton' onClick={() => this.additem(item.id, item.numberofitems)}>additem</button>
      </div>
    ))


    // const decode = Base64.decode(window.localStorage.ecom_key)


    // console.log(this.context.inventory)
    const appValue = {
      emptyCart:this.clodeButton,
      forceLogIn:this.activateLogin,
      closeModal:this.closeModal,
      inventory: this.state.inventory,
      cart: this.state.cart,
      currentUser: this.state.LoggedInUser,
      getLoggedInUser: this.getLoggedInUser,
      fetchCart:this.fetchCart
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
             
              <div class='buttonDiv'>
              <div class='buttonInnerDiv'>
              <button class='loginButton' onClick={this.openModal}>Login</button>
              <button  class='cartButton' onClick={this.openCart}>cart</button>
              </div>
              </div>
              <Popup open={this.state.open}
          closeOnDocumentClick
          onClose={this.closeModal} contentStyle={{width: "300px", borderRadius:'30px'}}  position="bottom center">
                  <Login />
              </Popup>
                <Popup open={this.state.CartOpen}
          closeOnDocumentClick
          onClose={this.closeCart} contentStyle={{width: "300px", height:'600px',borderRadius:'30px', overflow:'scroll' ,borderStyle:"solid", borderColor:'white',borderWidth:'10px'}} position="bottom center">
              <Cart />
              </Popup>
              
              <Logo />
              <div class='homeDiv'>
                {listedItem}  
                </div>
            </Route>

          </Switch>
        </div>
      </StoreContext.Provider>
    )
  }
}


const modelWindow= {
  backGroundColor:'grey',
}

export default withRouter(App)