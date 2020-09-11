import React, { Component } from 'react'
import { getCustomers, deleteCustomer, handleTrans } from '../services/customerService';
import { Link } from 'react-router-dom';
import SearchBox from './searchBox';
import { paginate } from '../utils/paginate'
import _ from 'lodash'
import Pagination from './common/Pagination';


class Customers extends Component {
    state = {
        customers: [],
        currentPage: 1,
        pageSize:4,
        searchQuery:"",
        sortColumn: { path:"name", order:"asc" }
   }

    async componentDidMount() {
       const { data: customers} = await getCustomers()
       this.setState({ customers })
    }
    
    handleDelete = async (id) => {
        const customers = this.state.customers.filter(e => e._id !== id)
        this.setState({ customers })
        
        await deleteCustomer(id)
    }

    handleTrans= async customer => {
        const customers =  [...this.state.customers]
        const index = customers.indexOf(customer)
        customers[index].isGold = !customers[index].isGold
        this.setState({ customers })        
        
        await handleTrans(customer)
    }
    
    handlePageChange = page => {
        this.setState({ currentPage: page })
    }

    handleSearch = query => {
        this.setState({ searchQuery: query, currentPage: 1  })
    }



    render() {
        const { customers: allCustomers, pageSize, currentPage, sortColumn, searchQuery} = this.state;
        const  count = allCustomers.length;

        let searched = allCustomers;
        if(searchQuery) {
            searched = allCustomers.filter(m => m.name.toLowerCase().match(searchQuery.toLowerCase()))
        }
    

        const sorted = _.orderBy(searched, [sortColumn.path], [sortColumn.order])
        
        const customers = paginate(sorted, currentPage, pageSize)


        return (
            <div>
                <Link className="btn btn-primary m-4" to="/customers/new" >New Customer</Link>
                <SearchBox searchQuery={searchQuery} onChange={this.handleSearch} />
            <table className="table">
            <thead className="thead-light">
                <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Trust</th>
                    <th />
                </tr>
            </thead>
            <tbody>
            {
            customers.map(customer => (
            <tr key={customer._id} >
                <td><Link to={`/customers/${customer._id}`} >{customer.name}</Link></td>
                <td>{customer.phone}</td>
                <td>{customer.isGold === true ? 
                (<span className="badge badge-primary"
                onClick={this.handleTrans.bind(this, customer)}
                ><i className="fa fa-heart" /></span>) : 
                (<span className="badge badge-danger"
                onClick={this.handleTrans.bind(this, customer)}
                ><i className="fa fa-heart" /></span>)}</td>
                <td><button className="btn btn-danger"
                onClick={this.handleDelete.bind(this, customer._id)}                
                >Delete</button></td>
            </tr>
            ))
            }
            </tbody>
            </table>
            <Pagination currentPage={currentPage} 
            pageSize={pageSize} itemsCount={count} 
            onPageChange={this.handlePageChange}
            />
            </div>
        )
    }
}

export default Customers;
