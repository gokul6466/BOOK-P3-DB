// Data Transfer Object -Book

class IssuedBook{
    _id;
    name;
    genre;
    price;
    publisher;
    issuedBy;
    issuedDate;
    returnDate;


//whenever we create obj, the constructor gets invoked = parameterised constructor
constructor(user){
    this._id = user.IssuedBook._id;
    this.name = user.IssuedBook.name;
    this.genre= user.IssuedBook.genre;
    this.price = user.IssuedBook.price;
    this.publisher = user.IssuedBook.publisher;
    this.issuedBy = user.issuedBy;
    this.issuedDate = user.issuedDate;
    this.returnDate = user.returnDate;


}
}

// var ref=new IsuuedBook(userobj);
module.exports = IssuedBook;