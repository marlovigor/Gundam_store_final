import React from 'react'
import './cartComponent.css'



export default function Item(props) {
    console.log(props.itemid)
    return (
        <div>
            <div class='innerDiv'>
            <img class='image' src={props.image}/>
            <h1 class='name'>{props.name}</h1>
            <p class='discription'>Description:{props.description}</p>
             <p>Price:${props.price}USD</p>
            {/* <h3>count: {props.numberOfItems}</h3>
            <button onClick={props.increase}>+</button>
            <button onClick={props.decrease}>-</button> */}
             </div>
        </div>
    )
}