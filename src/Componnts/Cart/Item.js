import React from 'react'
import './item.css';


export default function Item(props) {
    return (
        <div>
            <div className='innerDiv'>
            <img src={props.image}/>
            <h1>{props.name}</h1>
            <p>Description:{props.description}</p>
             <p>Price:${props.price}USD</p>
            <h3>count{props.numberOfItems}</h3>
            
             </div>
        </div>
    )
}