import React, { Component } from 'react'
import Item from './Item';
import { StoreContext } from '../../StoreContext'
import SearchBar from './SearchBar'
import Logo from '../Logo/Logo'
 

export default class Home extends Component {
  

  static contextType = StoreContext

  state={
    items:this.context.inventory
  }

  componentDidMount(){

  }


    render() {
      // console.log(this.context.items)


      const listedItem = this.state.items.map(item => (
        <Item 
        key={item.gundamId}
        id={item.gundamId}
        image={item.image}
        price={item.price}
        itemName={item.name.toUpperCase()}
        description={item.catagory}
         />
    ))
        return (
            <div className="App">
              <Logo />
              <SearchBar />
              {listedItem}
              <h2>random</h2>
          </div>
        )
    }
}
