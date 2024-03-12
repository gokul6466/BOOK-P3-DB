const {UserModal,BookModal}=require("../modals/index");
const IssuedBook = require("../dtos/Book-dto");

//const getallbooks = ( ) =>{};

exports.getallbooks = async(req,res) => {
    const books = await BookModal.find();
    if(books.length === 0){
        return res.status(404).json({
            success:false,
            message:"no book found"
        })
    }
    res.status(200).json({
        success:true,
        data:books,
    });
};

exports. getsinglebookbyid =async (req,res) => {
    const{id}=req.params;
    const book = await BookModal.findById(id);

    if(!book){
        return res.status(404).json({
            success:false,
            message:"book not found",
            });
          }
        return res.status(200).json({
            success:true,
            message:"found the book by their id",
            data:book,
        });

};

exports.getallissuedbooksbyid = async(req,res)=>{
    const users = await UserModal.find({
        issuedBook:{$exists:true},
    }).populate("issuedBook");

    //data transfer object
    const issuedBooks = users.map((each)=> new IssuedBook(each));

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
        
};

exports.addnewbook = async(req,res)=>{

 const {data}=req.body;

    if(!data)
    {
        return res.status(400).json({
            success:false,
            message:"no data to add a book",
        });
    }
    await BookModal.create(data);
    const allbooks = await BookModal.find(); 

    return res.status(201).json({
        success:true,
        message:"Added book succesfully",
        data:allbooks,
    });

};
exports.updatebookbyid = async (req,res)=>{
    const {id}=req.params;
    const {data}=req.body;

    const updateBook = await BookModal.findOneAndUpdate({
        _id:id,
    },data,{
        new:true,
    
});
return res.status(200).json({
    success:true,
    message:"updated a book by their id ",
    data:updateBook,
});

};
