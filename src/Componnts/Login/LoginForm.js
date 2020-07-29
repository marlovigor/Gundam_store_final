import React, { Component } from 'react'

export default class LoginForm extends Component {
    render() {
        return (
            <div>
                <form>
                    <input name='email' type='text' placeholder='username'></input> <br/>
                    <input name='password' type='text' placeholder='password'></input>
                </form>
            </div>
        )
    }
}
