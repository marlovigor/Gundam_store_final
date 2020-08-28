import React, { Component } from 'react'
import { StoreContext } from '../../StoreContext'
import Item from './Item'
import './cartComponent.css'
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
        if (userCart === undefined) {
            this.props.history.push('/login')
        } else {

            fetch(`http://localhost:8000/cart/${userCart}`)
                .then(response => response.json())
                .then(data => this.setState({ cart: data.items }))
                .then(data => console.log(data))
            console.log('app mounted')

        }

        //if current user is undefinded send them back to login

    }


   DeleteItem=(item)=>{
        fetch(`http://localhost:8000/cart/${item}`, {
            method: 'DELETE',
            headers: { 'content-type': 'application/json' }
        })
        .then(() => {
            // value.deletNote(item);
          })
        console.log()
        console.log(item)
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
                <div>
                <Item
                    key={item.gundamId}
                    id={item.gundamId}
                    image={item.itemimage}
                    price={item.price}
                    itemName={item.name.toUpperCase()}
                    description={item.description}
                    delete={item.gundamId}
                    numberOfItems={this.state.numberOfItems}
                    

                    
                />
                <button onClick={() => this.DeleteItem(item.id)}>remove</button>
                <h4>1</h4>
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
        // console.log(product)
        return (
            <div>
                <h1>CART</h1>
                {/* {items} */}
                {names}

                <h3>TOTAL:</h3>

            </div>
        )
    }
}

export default withRouter(Cart)
