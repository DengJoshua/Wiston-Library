import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getBook, saveBook } from "../services/bookService";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genre: "",
      numberInStock: "",
      author: "",
      body:""
    },
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label("Title"),
    genre: Joi.string()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    author: Joi.string()
      .required()
      .min(0)
      .max(50)
      .label("Author"),
    body: Joi.string().required().label("Body")
  };


  async populateBook() {
    try {
      const bookId =  this.props.match.params.id;
      if (bookId === "new") return;

      const { data: book } = await getBook(bookId);
      this.setState({ data: this.mapToViewModel(book)});
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateBook();
  }

  mapToViewModel(book){
    return {
      _id: book._id,
      title: book.title,
      genre: book.genre,
      numberInStock: book.numberInStock,
      author: book.author,
      body: book.body 
     };
  }

  doSubmit = async () => {
    await saveBook(this.state.data);

    this.props.history.push("/Books");
  };

  render() {
    return (
      <div>
        <h1>Book Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.createInput("title", "Title")}
          {this.createInput("genre", "Genre")}
          {this.createInput("author", "Author")}
          {this.createInput("numberInStock", "Number in Stock", "number")}
          {this.createInput("body", "Body")}
          {this.createButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
