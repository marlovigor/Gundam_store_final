import React from 'react'
import './item.css';
import { Link } from "react-router-dom";

export default function Item(props) {
    return (
        <div>
            <Link to={`/home/${props.id}`}><img src={props.image}/></Link>
            <h1>{props.itemName}</h1>
            <p>Grade:{props.description}</p>
             <p>Price:${props.price}USD</p>
             {/* <button onClick={props.onClick}>add to cart</button> */}
             {/* use price funtion from previous lesson to make the prive section better */}
        </div>
    )
}

