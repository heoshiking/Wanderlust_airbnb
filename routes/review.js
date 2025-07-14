const express= require("express");
const router= express.Router({mergeParams: true});
const wrapAsync= require("../Utils/wrapAsync.js");
const ExpressError= require("../Utils/ExpressError.js");
const {listingSchema , reviewSchema}= require("../schema.js");
const Review= require("../models/review.js");
const Listing= require("../models/listing.js");
const {validateReview, isLoggedIn,isReviewAuthor}= require("../middleware.js")

const reviewController= require("../controllers/review.js");


// const validateReview= (req , res , next)=>{
//     let {error}=reviewSchema.validate(req.body);

//     if(error){
//         let errMsg=error.details.map((el)=>el.message).join(",");
//         throw new ExpressError(400 , errMsg);
//     }
//     else{
//         next();
//     }
// };

//review
// //post review route
router.post("/" ,isLoggedIn,  validateReview ,wrapAsync (reviewController.createReview));

//delete review route

router.delete("/:reviewId" ,isLoggedIn,isReviewAuthor, wrapAsync (reviewController.destroyReview)
);

module.exports= router;