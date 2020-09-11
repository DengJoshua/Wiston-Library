import http  from './httpService'

const apiEndPoint = "http://localhost:4000/api/books"

export function getBooks(){
    return http.get(apiEndPoint)
}

export function getBook(BookId){
    return http.get(apiEndPoint + "/" + BookId)
}


export function saveBook(book){
    if (book._id) {
        const body = { ...book };
        delete body._id;
        return http.put(apiEndPoint + "/"  + book._id, body)
    } 
      return http.post(apiEndPoint , book);
}

export function handleTrans(book){
   return http.patch(apiEndPoint + "/" + book._id, { numberInStock: book.numberInStock})
}

export function deleteBook(bookId) {
    return http.delete(apiEndPoint + "/" + bookId)
}


