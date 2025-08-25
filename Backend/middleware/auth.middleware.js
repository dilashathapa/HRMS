import jwt from "jsonwebtoken";
export function authorizeToken (req, res, next) {

    // 1. Extract Token from Headers
    const authHeader = req.headers.authorization;
    
// 2. Check if token is available
if (!authHeader || !authHeader.startsWith("Bearer")){
    return res.status(400).json({message: "no token provided."})
}

// 3. split the token
const token = authHeader.split(" ")[1];
try {

//4. verify the token
const decoded = jwt.verify(token, process.env.JWT_SECRET);
req.user = decoded;
next();
} catch (error) {

    // 5. if token unverified, send error response
    console.log("Error verifying token:", error);
    res.status(400).json({message: "Invalid token"});
}
}

export function checkRole(req, res, next){
    const user = req.user;
    const {userType} = user;
    if (userType.toLowerCase() === "employee") {
        return rex.status(400).json({message: "Access Denied."});
    }
    next();
}