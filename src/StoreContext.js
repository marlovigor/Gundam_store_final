import React, { Component } from "react"




export const StoreContext = React.createContext({
    inventory:[],
    cart:[],
    fetchCart:() => { },
    additem: () => { },
    edititem: () => { },
    postitem: () => { },
    deleteitem: () => { },
    getLoggedInUser: () => { },
});


console.log("working")