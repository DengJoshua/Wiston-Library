import React from 'react'
import { getCurrentUser, loginWithJwt } from '../../services/authService';
import Joi  from 'joi-browser';
import Form from './form';
import { saveUser } from '../../services/userService';

class Proflie extends Form {
    state = {
        data:{
            email:"",
            username:""
        },
        errors: {}
    }

    componentDidMount() {
        const user = getCurrentUser()
        this.setState({ data: this.mapToModelView(user) })
    }
    
    schema =  {
        _id: Joi.string(),
        email: Joi.string().required(),
        username: Joi.string().required()
    }

    mapToModelView(user) {
        return {
            _id: user._id,
            username: user.username,
            email: user.email
        }
    }


    doSubmit = async () => {
        localStorage.removeItem("token")
        try {
         const response = await saveUser(this.state.data)
         const jwt = response.headers["x-auth-token"]
         console.log(jwt)
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
            <div>
                <form onSubmit={this.handleSubmit}>
                {this.createInput("username", "Username")}
                {this.createInput("email", "Email")}
                {this.createButton("Save")}
                </form>
            </div>
        )
    }
}

export default Proflie;
