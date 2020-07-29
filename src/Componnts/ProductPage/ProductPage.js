import React from 'react';
import { useContext } from 'react';
import { useParams } from "react-router-dom"
import { StoreContext } from '../../StoreContext';
import ProductPageItem from './ProductPageItem'


export default function ProductPage() {
    const value = useContext(StoreContext);
    const { itemID } = useParams();
    const filteredItem = value.inventory.find(item => item.gundamId == itemID)
    
    return (
        <div>
            <ProductPageItem 
             image={filteredItem.image}
             itemName={filteredItem.name}
             price={filteredItem.price}
            />
        </div>
    )
}

