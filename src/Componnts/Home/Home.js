import React, { Component } from 'react'
import Item from './Item';
import { StoreContext } from '../../StoreContext'
import SearchBar from './SearchBar'
import Logo from '../Logo/Logo'
import gundamUnits from '../../gundum'
 

export default class Home extends Component {
  
  
  static contextType = StoreContext

  state={
    inventory:[]
  }

  componentDidMount(){
    fetch('http://localhost:8000/inventory')
              .then(response => response.json())
              .then(data => this.setState({ inventory: data }))
  }

    render() {
      console.log(this.state.items)
      console.log(this.context.inventory)


      const listedItem = this.state.inventory.map(item => (
        <Item 
        key={item.gundamId}
        id={item.gundamId}
        image={item.itemimage}
        price={item.price}
        itemName={item.name.toUpperCase()}
        description={item.description}
         />
    ))
        return (
            <div className="App">
              <Logo />
              <SearchBar />
              {listedItem}
              
          </div>
        )
    }
}
