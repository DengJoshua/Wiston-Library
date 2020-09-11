import React from 'react'
import Form from './common/form'
import Joi from 'joi-browser'
import { saveUser } from '../services/userService'
import { loginWithJwt } from '../services/authService'


class SignUp extends Form {
  state = {
    data: { email:"", username:"", password:"" },
    errors: {}
    }

  schema = {
    username: Joi.string().required().label("User name") ,
    email: Joi.string().required().email().label("User email"),
    password: Joi.string().required().label("Password")
    }



  doSubmit = async () => {
     try {
      const response = await saveUser(this.state.data)
      const jwt = response.headers["x-auth-token"]
      await loginWithJwt(jwt)
      window.location = "/"
     } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
  }
}

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Sign Up</h1>
        {this.createInput("email", "User Email" )}
        {this.createInput("username", "User Name" )}
        {this.createInput("password", "User Password", "password" )}
        {this.createButton("Sign Up")}
      </form>  
    )
  }
}

export default SignUp;
