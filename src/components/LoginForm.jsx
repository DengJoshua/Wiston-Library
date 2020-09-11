import React from 'react'
import  Joi  from 'joi-browser'
import Form from './common/form'
import { login } from '../services/authService'
import { Link } from 'react-router-dom'

class LoginForm extends Form {
   state = {
     data: {email: "", password:""},
     errors: {}
  }


    schema = {
        email: Joi.string().required().email().label("Email"),
        password: Joi.string().required().label("Password")
    }

    doSubmit = async () => {
      try {
        const { data } = this.state;
        await login(data)

        const { state } = this.props.location;
        window.location = state ? state.from.pathname : "/";
      } catch (ex) {
        if(ex.response && ex.response.status === 400) {
          const errors = { ...this.state.errors };
          errors.email = ex.response.data;
          this.setState({ errors });
        } 
      }
    }

  render() {
    return (
          <div>
            <form onSubmit={this.handleSubmit}>
                <h1>Login</h1>
                { this.createInput("email", "Enter Email") }
                { this.createInput("password", "Enter Password", "password") }
                { this.createButton("Login") }
            </form>
            <p>Don't have an account, <Link to="/sign-up">Sign Up</Link></p>
          </div>
    )
  }
}

export default LoginForm;