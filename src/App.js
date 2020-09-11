import React, { Component } from 'react';
import './App.css';
import Books from './components/books';
import { Route, Redirect, Switch } from 'react-router-dom';
import NavBar from './components/navbar';
import NotFound from './components/not-found';
import LoginForm from './components/LoginForm';
import SignUp from './components/SignUp';
import BookForm from './components/bookForm';
import { getCurrentUser } from './services/authService';
import Logout from './components/logout';
import Proflie from './components/common/profile';
import {ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import Customers from './components/customers';
import CustomerForm from './components/customerForm';
import Rentals from './components/Rentals';
import ProtectedRoute from './components/common/protectedRoute';
import Users from './components/users';

class App extends Component {
    state = {}

    componentDidMount() {
      const user = getCurrentUser()
      this.setState({ user })
    }

  render() {
    const { user } = this.state;

    return (
       <div className="app">
         <ToastContainer />
         <NavBar user={user} />
         <Switch>
        <ProtectedRoute path="/Books/:id" component={BookForm} />
         <Route  path="/customers/:id" component={CustomerForm} />
         <Route  path="/users" component={Users} />
         <Route path="/Books" render={props => <Books { ...props} user={user} />} />
         <Route path="/login" component={LoginForm} />
         <Route path="/Sign-up" component={SignUp} />
         <Route path="/logout" component={Logout} />
         <Route path="/rentals" component={Rentals} />
         <Route path="/customers" component={Customers} />
         <Route path="/profile"  component={Proflie} />
         <Redirect exact from="/" to="/Books" />
         <Route to="/not-found" component={NotFound} />
         <Redirect to="/not-found" />         
         </Switch>         
         </div>
    )
  }
}
 
export default App;
