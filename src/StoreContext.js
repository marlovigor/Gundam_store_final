import React from "react"




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
    deleteCartItem: () => { },
    LoginSucces: () => { },
});


