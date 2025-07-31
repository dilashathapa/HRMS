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

const decoded = jwt.verify(token, process.env.JWT_SECRET);

const {userType} = decoded;
if(userType.toLowerCase() === "employee") {
    return res.status(400).json({message: "access denied."})
    
}
next();

} catch (error) {
    // 6. if unverified, send error response
    console.log("Error verifying token:", error);
    res.status(400).json({message: "Invalid token"});
}

}