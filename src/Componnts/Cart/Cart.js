import React, { Component } from 'react'
import { StoreContext } from '../../StoreContext'
import Item from './Item'
import { withRouter } from 'react-router'

class Cart extends Component {

    static contextType = StoreContext

    state = {
        userkey: window.localStorage.getItem('ecom_key'),
        cart: [],
        itemCount:1,
        numberofitems:0

        
    }

    componentDidMount() {
        const userCart = this.context.currentUser.id
            // console.log(this.state.userCart)
        if(userCart === undefined) {
            console.log(userCart)
            // this.context.forceLogIn()
            // this.context.emptyCart()
        }  else {
            fetch(`http://localhost:8000/cart/${userCart}`)
                .then(response => response.json())
                .then(data => this.setState({ cart: data.items }))
            console.log('app mounted')
        }
        }

   DeleteCartItem = (cartId) => {
    console.log('im fired')
    this.setState({
      ...this.state,
      cart: this.state.cart.filter((cart) => cart.id !== +cartId),
    });
  };


   DeleteItem=(item)=>{
        fetch(`http://localhost:8000/cart/${item}`, {
            method: 'DELETE',
            headers: { 'content-type': 'application/json' }
        })
        .then(this.DeleteCartItem(item))
        console.log(item)
        // console.log(item)
    }

    // addcount=(item)=>{
    //     fetch(`http://localhost:8000/cart/${item}`, {
    //         method: 'PATCH',
    //         headers: { 'content-type': 'application/json' }
    //     })
    //     .then(() => {
    //         // value.deletNote(item);
    //       })
    //     console.log()
    //     console.log(item)
    // }

    render() {
        console.log(this.state.cart)
        const names = this.state.cart.map(item => {
            return (
                <div class='cartContainerDiv'>
                <Item
                    itemid={item.itemid}
                    key={item.itemid}
                    id={item.itemid}
                    image={item.itemimage}
                    price={item.price}
                    itemName={item.name.toUpperCase()}
                    description={item.description}
                    // numberOfItems={this.state.itemCount}
                    // delete={item.gundamId}
                    // increase={()=> this.increase(item.itemid)}
                    // decrease={this.decrease}
                    // numberOfItems={this.handleClick()}                    
                />
                
                <button onClick={() => this.DeleteItem(item.id)}>remove</button>
                
                {/* <button onClick={() => this.addcount(item.id)}>add count</button> */}

                </div>
            )
            
        })


        // const product= this.context.cart.items
        // const items = this.state.cart.map(item  => (
        //       <Item
        //       name={item.name}
        //       image={item.itemimage}
        //       description={item.description}
        //       price={item.price}
        //     />
        //   ))
        // if(items === undefined) return ''
        console.log(this.state.cart)
        return (
            <div className='mainDiv'>
                
                <h1>CART</h1>
                {/* {items} */}
                {names}

                <h3>TOTAL:</h3>

            </div>
        )
    }
}

export default withRouter(Cart)
