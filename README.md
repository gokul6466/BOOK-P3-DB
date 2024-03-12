# BOOK-P2

server >>storing book datas
       >>user register
       >> subscriber


fine system:
user:06-03-2023  -   06-06-2023
09-06-2023 => 50*3=150/-



# routes and Endpoints

## /users
post:Create a new server
get:get all the user info here

## /users/{id}
get:get a user by id
put:update a user by their id
delete:delete a user by id(chk if he still have an issued book)&&(is there any fine to paid)

## /users/subscription-details/{id}

GET:get your subscription details
>> date of subscription
>>valid till
>>IS there any fine

##
Get:get all issued books with their fine


https://github.com/rohandt0002/J0123P3-Build/blob/Day-01/data/users.json

#### MONGO-DB 

 
   
// dto
data transfer object

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



updatebookbyid
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