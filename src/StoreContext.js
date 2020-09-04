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
    forceLogIn: () => { },
    closeModal: () => { },
    fetchCart: () => { }
});


console.log("working")