import React from 'react';
import { useContext } from 'react';
import { useParams } from "react-router-dom"
import { StoreContext } from '../../StoreContext';
import ProductPageItem from './ProductPageItem'


export default function ProductPage() {
    const value = useContext(StoreContext);
    const { itemID } = useParams();
    const filteredItem = value.inventory.find(item => item.id == itemID)
    if(filteredItem === undefined) return ''
    // console.log(filteredItem)
    
    return (
        <div>
            <ProductPageItem 
             image={filteredItem.itemimage}
             itemName={filteredItem.name}
             price={filteredItem.price}
            />
        </div>
    )
}

// suggest taking the matching data and macking a api pull

