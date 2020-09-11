import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class NavBar extends Component {
  render() {
    const { user } = this.props;

    return (
        <nav className="navbar navbar-expand-md bg-dark navbar-dark">
        <a className="navbar-brand" href="/">WISTON LIBRARY</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavbar">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink to="/Books"
              className="nav-link"
              >Books</NavLink>
            </li>
            {
              user && user.isAdmin && (
                  <li className="nav-item">
                    <NavLink to="/users"
                    className="nav-link"
                    >Users</NavLink>
                  </li>
              ) 
            }
            {
              !user && (
                <React.Fragment>
                  <li className="nav-item">
                    <NavLink to="/login"
                    className="nav-link"
                    >Login</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/Sign-up" 
                    className="nav-link"
                    >Sign Up</NavLink>
                  </li>
                </React.Fragment>
              ) 
            }
            {
              user && (
                <React.Fragment>
                  <li className="nav-item">
                    <NavLink to="/customers"
                    className="nav-link"
                    >Customers</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/rentals"
                    className="nav-link"
                    >Rentals
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/profile"
                    className="nav-link"
                  >{user.username}</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/logout"
                    className="nav-link"
                    >Logout</NavLink>
                  </li>
                </React.Fragment>
              ) 
            }
                
          </ul>
        </div>  
      </nav>
    )
  }
}

export default NavBar;
