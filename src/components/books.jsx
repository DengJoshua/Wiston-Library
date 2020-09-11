import React, { Component } from 'react'
import { getBooks, deleteBook, handleTrans } from '../services/bookService';
import Pagination from './common/Pagination';
import { paginate } from '../utils/paginate'
import _ from 'lodash'
import SearchBox from './searchBox';
import BooksTable from './booksTable';
import { Link } from 'react-router-dom';


class Books extends Component {
    state = {
        books: [],
        currentPage: 1,
        pageSize: 4,
        sortColumn: { path:"title", order:"asc"}
    }

    async componentDidMount() {
      const {data: books } = await getBooks();
      this.setState({ books })
    }
    

    handleRent = async book => {
        const books =  [...this.state.books]
        const index = books.indexOf(book)
        books[index].numberInStock = books[index].numberInStock - 1
        this.setState({ books })

        await handleTrans(book)
    }

    handleDelete = async book => {
        const books = this.state.books.filter(m => m._id !== book._id)
        this.setState({ books })

        await deleteBook(book._id)
    }

    handleReturn = async book => {
        const books =  [...this.state.books]
        const index = books.indexOf(book)
        books[index].numberInStock = books[index].numberInStock + 1
        this.setState({ books })        
        
        await handleTrans(book)
    }

    handlePageChange = page => {
        this.setState({ currentPage: page })
    }

    handleSearch = query => {
        this.setState({ searchQuery: query, currentPage: 1 })
    }


    render() {
    const { books: allBooks, pageSize, currentPage, sortColumn, searchQuery} = this.state;
    const  count = allBooks.length;

    const { user } = this.props;

    let searched = allBooks;
    if(searchQuery) {
        searched = allBooks.filter(m => m.title.toLowerCase().match(searchQuery.toLowerCase()))
    }
 

    const sorted = _.orderBy(searched, [sortColumn.path], [sortColumn.order])
     
    const books = paginate(sorted, currentPage, pageSize)

    if(count === 0) { return <p>Showing zero books from the database</p> }
    
    return (
            <div>
                <p>Showing { count } books from the database</p>
                { user && user.isAdmin &&
                 ( <Link to="/Books/new" className="btn btn-primary m-2" >
                NEW BOOK
                </Link>)}
                <SearchBox value={searchQuery} onChange={this.handleSearch}/>
                <BooksTable
                onDelete={this.handleDelete}
                onRent={this.handleRent}
                onReturn={this.handleReturn}
                books={books}    
                user={user}              
                />
                <Pagination itemsCount={count} currentPage={currentPage} 
                pageSize={pageSize} 
                onPageChange={this.handlePageChange}
                />
            </div>
        )
    }
}

export default Books;