import React, { Component } from 'react'
import TokenService from '../../services/Token-services'
import { StoreContext } from '../../StoreContext'
import { withRouter } from 'react-router'
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

        fetch('http://localhost:8000/api/auth/login', {
            method: 'POST',
            body: JSON.stringify(this.state.user),
            headers: { 'content-type': 'application/json' }
        })
            .then(response => {
                
                if (response.status === 200) {
                    console.log(response)                    
                    TokenService.saveAuthToken(
                        TokenService.makeBasicAuthToken(name.value, password.value)
                    )
                    
                    this.context.closeModal()
                    this.context.getLoggedInUser(name.value)
                    

                    // your not sending any datta to the main app state
                    // this.context.fetchCart()
                } else if (response.status === 400) {
                    console.log('wrong user')
                }

            })
    }


    render() {
        return (
            <div class='loginContainer'>
                <form onSubmit={this.handleSubmitAuth}>
                    <input required name='name' type='text' placeholder='name'></input>
                    <input required name='password' type='text' placeholder='password'></input><br/>
                    <button>Login</button>
                </form>
            </div>
        )
    }
}

export default withRouter(LoginForm)