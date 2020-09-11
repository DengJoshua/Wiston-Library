import React, { Component } from 'react'
import Table from './common/table';
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../services/authService';

class BooksTable extends Component {

    columns = [
        {
            path:"title",
            label:"Title",
            content: book => <Link to={`/Books/${book._id}`} className="link" >{book.title}</Link>
          
          },
        {
          path:"genre",
          label:"Genre"
        },
        {
          path:"numberInStock",
          label:"Stock"
        },
        {
          path:"author",
          label:"Author"
        }
    ]

    returnButton = {
      key:"return",
      content: book => <button className="btn btn-success"
      onClick={() => this.props.onReturn(book)}
      >Return</button>    
    }

    rentButton = {
      key: "rent",
      content: book => <a 
      style={{ color : "#fff"}}
      className={ book.numberInStock === 0 ? "btn btn-primary disabled" : 
      "btn btn-primary"}
      onClick={() => this.props.onRent(book)}
      >Rent</a>       
    }

    deleteButton = {
      key:"delete",
      content: book => <button className="btn btn-danger"
      onClick={() => this.props.onDelete(book)}
      >Delete</button>      
    }
    
    
    constructor() {
      super()
      const user = getCurrentUser()
      if(user) this.columns.push(this.rentButton)
      if(user) this.columns.push(this.returnButton)
      if(user && user.isAdmin) this.columns.push(this.deleteButton)
    }    




  render() {
    const { books } = this.props;
    return (
      <Table columns={this.columns} books={books} />
    )
  }
}

export default BooksTable;
