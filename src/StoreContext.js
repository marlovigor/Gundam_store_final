import React, { Component } from "react"




export const StoreContext = React.createContext({
    inventory:[],
    cart:[],
    additem: () => { },
    edititem: () => { },
    postitem: () => { },
    deleteitem: () => { },
});


console.log("working")