import React from 'react'
import './home.css'
import { Link } from "react-router-dom";


export default function Item(props) {
    return (
        <div class='itemContainer'>
            <Link to={`/home/${props.id}`}><img class='images' src={props.image} alt='gundam'/></Link>
            <h1 class='itemName'>{props.itemName}</h1>
             <p >Price:${props.price}USD</p>
             {/* <button onClick={props.onClick}>add to cart</button> */}
             {/* use price funtion from previous lesson to make the prive section better */}
        </div>
    )
}

// const container ={
//     backgroundColor:'skyblue',
//     marginTop:'20px',
//     borderColor:'white',
//     borderStyle:'solid',
//     borderRadius:'30px',
//     padding:'15px',
//     maxHieght:'100px',
// }

// const price ={
//     fontSize:'1.2rem',
// }

// const img ={
//     maxWidth:'15rem',
//     minHieght:'30rem',
//     borderRadius:'20px',
// }

