import React from 'react'
import { getCustomer, saveCustomer } from '../services/customerService';
import Form from './common/form';
import Joi from 'joi-browser';

class CustomerForm extends Form {
    state = {
        data: {
            name:"",
            phone:"",
            isGold:""
        },
        errors: {}
    }

    async componentDidMount() {
        const customerId = this.props.match.params.id;
        if(customerId === "new") return

        const { data: customer} = await getCustomer(customerId)
        this.setState({ data: this.mapToViewer(customer) })
    }
    
    schema = {
        _id: Joi.string(),
        name: Joi.string().required().min(3).max(50).label("Name"),
        phone: Joi.string().required().min(10).max(50).label("Phone number"),
        isGold: Joi.boolean().required().label("Trust")
    }



    mapToViewer(customer) {
        return {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone,
            isGold: customer.isGold
        }
    }

    doSubmit = async () => {
        await saveCustomer(this.state.data)

        this.props.history.push("/Customers");
    }

    render() {
        return (
            <div>
                <h1>Customer Form</h1>
                <form onSubmit={this.handleSubmit}>
                {this.createInput("name", "Name")}
                {this.createInput("phone", "Phone Number")}
                {this.createInput("isGold", "Trusted")}
                {this.createButton("Save")}
            </form>
            </div>
        )
    }
}

export default CustomerForm;
