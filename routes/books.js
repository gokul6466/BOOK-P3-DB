const express = require("express");
const {books}=require("../data/books.json");
const {users}=require("../data/Users.json");

const router = express.Router();

module.exports=router;

/**
 * Route:/books
 * Method:GET
 * Description:Get all books
 * access:Public
 * parameters:none
 */

router.get("/",(req,res)=>{
    res.status(200).json({
        success:true,
        message:"data in books",
        data:books,
    });
});

/**
 * Route:/books
 * Method:GET
 * Description:Get  books by their id
 * access:Public
 * parameters:id
 */
router.get("/:id",(req,res)=>{
    const {id}=req.params;
    const book = books.find((each)=>each.id===id);

    if(!book){
        return res.status(404).json({
            success:false,
            message:"book not found",
        });
    }
    return res.status(200).json({
        success:true,
        message:"found the book by their id",
        data:book
    });
});

/**
 * Route:/books/issued
 * Method:GET
 * Description:Get all issued books
 * access:Public
 * parameters:id
 */

router.get("/issued/by-user",(req,res)=>{
    const userwiththeissuedbook = users.filter((each)=>{
        if(each.issuedBook) return each;
    });
    const issuedBooks = [];
    userwiththeissuedbook.forEach((each)=>{
        const book = books.find((book)=>book.id === each.issuedBook);

        book.issuedBy = each.name;
        book.issuedDate = each.issuedDate;
        book.returnDate = each.returnDate;

        issuedBooks.push(book);
    });
    if(issuedBooks.length ===0){
        return res.status(404).json({
            success:false,
            message:"No Book have been issued yet..",
        });
        
    }
    return res.status(200).json({
        success:true,
        message:"users with the issued books....",
        data:issuedBooks,
    });
        
    });

/**
 * Route:/
 * Method:POST
 * Description:Adding a new book
 * access:Public
 * parameters:none
 * data:id,name,genre,price,publisher,author
 */
router.post("/",(req,res)=>{
    const {data}=req.body;

    if(!data)
    {
        return res.status(400).json({
            success:false,
            message:"no data to add a book",
        });
    }
    const book = books.find((each)=>each.id===data.id);
    if(book){
        return res.status(404).json({
            success:false,
            message:"id already exists",
        });
    }
    const allbooks={books,data};
    return res.status(201).json({
        success:true,
        message:"Added book succesfully",
        data:allbooks,
    });

});


/**
 * Route:/:id
 * Method:PUT
 * Description:updating a  book by their id
 * access:Public
 * parameters:id
 * data:id,name,genre,price,publisher,author
 */

router.put("/updatebook/:id",(req,res)=>{
    const {id}=req.params;
    const {data}=req.body;

    const book=books.find((each)=>each.id === id);
    if(!book){
        return res.status(404).json({
            success:false,
            message:"id does not exist",
        });
    }
    const updatedata=books.map((each)=>{
        if(each.id===id){
            return{ ...each , ...data};
        }
        return each;
    });
    return res.status(200).json({
        success:true,
        message:"updated a book by their id ",
        data:updatedata,
    });
});
module.exports=router;