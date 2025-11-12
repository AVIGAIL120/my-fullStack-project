
// const jwt= require("jsonwebtoken")
// const verifyJWT = (req,res,next) =>{
//     console.log(" בקשה התקבלה:", req.method, req.url);
   
//     const authHeader= req.headers.Authorization || req.headers.authorization
    
//     if(!authHeader?.startsWith("Bearer "))
//         return res.status(401).json({message:"Unauthorized"})
    
//     const token= authHeader.split(" ")[1]
//     console.log("token:", token);
//     console.log("secret:", process.env.ACCESS_TOKEN);

//     jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
//         if (err) return res.status(403).json({ message: "Invalid token" });
//         req.user = decoded;
//         next();
//     });
// }
// const verifyAdminJWT= (req,res,next)=>{
//     const userRole= req.user.userRole
//     if(userRole==="Admin")
//         next()
//     return res.status(403).send("only admin allow")
// }
// module.exports= {verifyJWT,verifyAdminJWT}
const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
    console.log("בקשה התקבלה:", req.method, req.url);

    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    // console.log("token:", token);
    // console.log("secret:", process.env.ACCESS_TOKEN);

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
        if (err) return res.status(403).json({ message: "Invalid token" });
        req.user = decoded;
        next();
    });
};

const verifyAdminJWT = (req, res, next) => {
    if (!req.user) return res.status(401).send("Unauthorized");

    const userRole = req.user.userRole;
    if (userRole === "Admin") {
        return next();
    }
    return res.status(403).send("only admin allow");
};

module.exports = { verifyJWT, verifyAdminJWT };
