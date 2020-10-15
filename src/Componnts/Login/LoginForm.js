import React, { Component } from 'react'
import TokenService from '../../services/Token-services'
import { StoreContext } from '../../StoreContext'
// import { withRouter } from 'react-router'
import {API_KEY} from '../../config'
import './login.css'

class LoginForm extends Component {

    static contextType = StoreContext

    state = {
        user: {
            name: '',
            password: ''
        }
    }
    handleSubmitAuth = (e) => {
        e.preventDefault()
        const { name, password } = e.target
        const user = this.state.user
        user.name = name.value
        user.password = password.value
        e.preventDefault()

        fetch(`${API_KEY}api/auth/login`, {
            method: 'POST',
            body: JSON.stringify(this.state.user),
            headers: { 'content-type': 'application/json' }
        })
            .then(response => {
                
                if (response.status === 200) {                
                    TokenService.saveAuthToken(
                        TokenService.makeBasicAuthToken(name.value, password.value)
                    )
                    
                    this.context.closeModal()
                    this.context.getLoggedInUser(name.value)
                    this.context.LoginSucces()
                    

                    // your not sending any datta to the main app state
                    // this.context.fetchCart()
                } else if (response.status === 400) {
                    
                }

            })
            
    }


    render() {
        return (
            <div class='loginContainer'>
                <form onSubmit={this.handleSubmitAuth}>
                    <input required name='name' type='text' placeholder='name' ></input>
                    <input required name='password' type='text' placeholder='password' ></input><br/>
                    <button>Login</button>
                </form>
                <h4>Enter  <br/> name: marlo <br/> password: password </h4>
                <h4>or  <br/> name: Noob <br/> password: bo-password </h4>
            </div>
        )
    }
}

export default LoginForm