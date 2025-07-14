const express= require("express");
const router= express.Router();
const wrapAsync= require("../Utils/wrapAsync.js");
const ExpressError= require("../Utils/ExpressError.js");
const {listingSchema , reviewSchema}= require("../schema.js");
const Listing= require("../models/listing.js");
const {isLoggedIn, isowner, validateListing}= require("../middleware.js");

const listingController= require("../controllers/listing.js");
const multer= require("multer");
const {storage}= require("../cloudConfig.js");
const upload= multer({ storage});

// const validateListing= (req , res , next)=>{
//     let {error}=listingSchema.validate(req.body);

//     if(error){
//         let errMsg=error.details.map((el)=>el.message).join(",");
//         throw new ExpressError(400 , errMsg);
//     }
//     else{
//         next();
//     }
// };

//index and create route
router.route("/")
.get(   wrapAsync(listingController.index)
)
.post( 
isLoggedIn,
 
upload.single("listing[image]"),
validateListing,
wrapAsync(listingController.createListing ));
 

//new route
router.get("/new" ,isLoggedIn,listingController.renderNewForm);

//show ,update and delete route
router.route("/:id")
.get(  wrapAsync(listingController.showListing))
.put( 
isLoggedIn,
isowner,
upload.single("listing[image]"), 
validateListing,
wrapAsync(listingController.updateListing))
.delete(  isLoggedIn,isowner,wrapAsync(listingController.destroyListing ));

// //index route
// router.get("/" ,  wrapAsync(listingController.index)
// );



// //show route
// router.get("/:id" , wrapAsync(listingController.showListing));

// //create route
// router.post("/",
// isLoggedIn,
// validateListing, 
// wrapAsync(listingController.createListing ));

//edit route
router.get("/:id/edit" ,  isLoggedIn,isowner,wrapAsync(listingController.renderEditForm)
);

// //update route
// router.put("/:id" ,
// isLoggedIn,
// isowner, 
// validateListing,
// wrapAsync(listingController.updateListing));

//delete route
// router.delete("/:id" , isLoggedIn,isowner,wrapAsync(listingController.destroyListing ));


module.exports= router;
