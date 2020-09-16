import React from 'react'
import './searchbar.css';
import { useContext } from 'react';
import { Link } from "react-router-dom";
import { StoreContext } from '../../StoreContext'


export default function SearchBar() {
    const value = useContext(StoreContext);


    return (
        <div>
              
                <form>
                    <input type='text' placeholder='Search Here'>
                    </input>
                    {/* <br/> */}
                </form>
                <Link to={'/cart'}>Cart</Link>
                {/* <button onClick={()=> value.fetchCart()}>Cart</button>                 */}
            
        </div>
    )
}

