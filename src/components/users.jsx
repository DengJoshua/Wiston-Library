import React, { Component } from 'react'
import { getUsers, deleteUser } from '../services/userService';
import SearchBox from './searchBox';
import { paginate } from '../utils/paginate'
import _ from 'lodash'
import Pagination from './common/Pagination';
import { getCurrentUser } from '../services/authService'



class Users extends Component {
    state = {
        users: [],
        currentPage: 1,
        pageSize:4,
        searchQuery:"",
        sortColumn: { path:"name", order:"asc" }
   }

    async componentDidMount() {
        const user = getCurrentUser()
        if(user && user.isAdmin) {
            const { data: users } = await getUsers()
            this.setState({ users })
        }
    }
    
    handleDelete = async (id) => {
        const users = this.state.users.filter(e => e._id !== id)
        this.setState({ users })
        
        await deleteUser(id)
    }

    
    handlePageChange = page => {
        this.setState({ currentPage: page })
    }

    handleSearch = query => {
        this.setState({ searchQuery: query, currentPage: 1  })
    }



    render() {
        const { users: allUsers, pageSize, currentPage, sortColumn, searchQuery} = this.state;
        const  count = allUsers.length;

        let searched = allUsers;
        if(searchQuery) {
            searched = allUsers.filter(m => m.username.toLowerCase().match(searchQuery.toLowerCase()))
        }
    

        const sorted = _.orderBy(searched, [sortColumn.path], [sortColumn.order])
        
        const users = paginate(sorted, currentPage, pageSize)


        return (
            <div className="2" >
                <SearchBox searchQuery={searchQuery} onChange={this.handleSearch} />
            <table className="table">
            <thead className="thead-light">
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th />
                </tr>
            </thead>
            <tbody>
            {
            users.map(user => (
            <tr key={user._id} >
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td><button className="btn btn-danger"
                onClick={this.handleDelete.bind(this, user._id)}                
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

export default Users;
