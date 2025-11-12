const express=require("express")
const router = express.Router()
const{getAppartment,addAppartment,adddComment,deleteAppartment,updateAppartment,addBooking,checkAvailable,getAllAppartment} =require("../controllers/appartmentControl")
const {verifyJWT,verifyAdminJWT} = require("../middleware/verifyJWT")

router.post("/",verifyJWT,addAppartment)
router.get("/appartments",getAllAppartment)
router.get("/:id",getAppartment)
router.put("/addComment",verifyJWT,adddComment)
router.delete("/:id",verifyJWT,deleteAppartment)
router.put("/update/:id",verifyJWT,updateAppartment)
router.put("/addBook",verifyJWT,addBooking)
router.get("/available",verifyJWT,checkAvailable)



module.exports = router