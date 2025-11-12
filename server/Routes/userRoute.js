const express=require("express")
const router = express.Router()
const {getBasket,addItemToBasket,deleteItem}= require("../controllers/userControl")
const {verifyJWT,verifyAdminJWT} = require("../middleware/verifyJWT")

// console.log("getBasket is:", getBasket); 
// router.get("/:id",verifyJWT,getBasket)
router.get("/", verifyJWT, getBasket);
router.put("/",verifyJWT,addItemToBasket)
router.delete("/basket/:item_id",verifyJWT,deleteItem)

module.exports = router