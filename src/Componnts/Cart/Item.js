import React from 'react'
import './cartComponent.css'



export default function Item(props) {
    return (
        <div>
            <div className='innerDiv'>
            <img className='image' src={props.image} alt='gundam'/>
            <h1 className='name'>{props.name}</h1>
            <p className='discription'>Description:{props.description}</p>
             <p>Price:${props.price}USD</p>
            {/* <h3>count: {props.numberOfItems}</h3>
            <button onClick={props.increase}>+</button>
            <button onClick={props.decrease}>-</button> */}
             </div>
        </div>
    )
}