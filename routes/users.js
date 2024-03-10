const express = require("express");
const {users}=require("../data/Users.json");

const router = express.Router();
/**
 * Route:/users
 * Method:GET
 * Description:Get all users
 * access:Public
 * parameters:None
 */
router.get("/",(req,res)=>{
    res.status(200).json({
        success:true,
        data:users
    });
});

/**
 * Route:/users/:uid
 * Method:GET
 * Description:Get single user by id
 * access:Public
 * parameters:id
 */
router.get("/:id",(req,res)=>{
    const {id}=req.params;
    const user=users.find((each)=> each.id === id);
    if(!user){
        return res.status(404).json({
            success:false,
            message:"user not found"
        });
    }
    return res.status(200).json({
        succes:true,
        message:"user found",
        data:user,
    });
});

/**
 * Route:/users/
 * Method:GET
 * Description: creating new users
 * access:Public
 * parameters:none
 */

router.post("/",(req,res)=>{
    const { id,name,surname,email,subscriptionType,subscriptionDate }=req.body;

    const user = users.find((each)=> each.id === id);
    if(user){
        return res.status(404).json({
            success:false,
            message:"user witrh the id already exists"
        });
    }

    users.push({
        id,
        name,
        surname,
        email,
        subscriptionType,
        subscriptionDate,
    });
    return res.status(201).json({
        success:true,
        message:"new data created",
        data:users
    });
});

/**
 * Route:/users/:id
 * Method:PUT
 * Description: updating a user by id
 * access:Public
 * parameters:id
 */

router.put("/:id",(req,res)=>{
    const {id}=req.params;
    const {data}=req.body;

    const user=users.find((each)=>each.id===id);
    if(!user){
        return res.status(404).json({
            success:false,
            message:"Id does not exist",
        });
    }
    const updateuserdata = users.map((each)=>{
        if(each.id===id){
            return {
                ...each,
                ...data,
            };
        }
        return each;
    });
    return res.status(200).json({
        success:true,
        message:"user data updated",
        data:updateuserdata,
    });
});

/**
 * Route:/users/:id
 * Method:DELETE
 * Description: updating a user by id
 * access:Public
 * parameters:id
 */
router.delete("/:id",(req,res)=>{
    const {id}=req.params;
    const user=users.find((each)=>each.id===id);
    if(!user){
        return res.status(404).json({
            succes:false,
            message:"user id does not exist",
        });
    }
    const index =users.indexOf(user);
    users.splice(index,1);

    return res.status(200).json({
        success:true,
        message:"Deleted user data",
        data:users,

    });
});

/**
 * Route:/users/subscription-details/:id
 * Method:GET
 * Description: GET all user subscription details
 * access:Public
 * parameters:id
 */

router.get("/subscription-details/:id",(req,res)=>{
    const {id}=req.params;
    const user = users.find((each)=>each.id===id);

    if(!user){
        return res.status(404).json({
            success:false,
            message:"user with the id doesn't exist",
        });
    }


const getDateInDays=(data = "")=>{
    let date;
    if(data === ""){
        date = new Date();
    }else {
        date = new Date(data);
    }
    let days = Math.floor(date/(1000*60*60*24));
    return days;
};

const subscriptionType =(date)=>{
    if ((users.subscriptionType ==="Basic")) {
        date=date+90;
    }else if ((users.subscriptionType === "Standard")){
        date=date+180;
    }else if ((users.subscriptionType === "Premium")){
        date=date+365;
    }
    return date;
};

// jan 1 1970 utc
let returnDate = getDateInDays(user.returnDate);
let currentDate = getDateInDays();
let subscriptionDate = getDateInDays(user.subscriptionDate);
let subscriptionExpiration = subscriptionType(subscriptionDate);

const data={
    ...user,
    isSubscriptionExpired:subscriptionExpiration < currentDate,
    daysLeftForExpiration:
    subscriptionExpiration <= currentDate ? 0
    : subscriptionExpiration - currentDate,

    fine:returnDate < currentDate ? subscriptionExpiration <= currentDate ? 100 :50 :0,
};
return res.status(200).json({
    success:true,
    message:"subscription detail for the user is",
    data,
});

});
module.exports = router;