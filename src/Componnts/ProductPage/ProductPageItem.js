import React from 'react'
import { Link } from "react-router-dom";

export default function productPageItem(props) {
    return (
        <div>
            <img src={props.image}/>
            <h1>{props.itemName}</h1>
            <p>Grade:{props.description}</p>
            <p>Price:${props.price}USD</p>
            <button>add to Cart</button>
            <Link to={'/cart'}>Cart</Link>
            
        </div>
    )
}
