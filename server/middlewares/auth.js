import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.json({success:false, message: "Unauthorized access" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        return res.json({success:false, message: "Invalid token" });
    }
}

export default auth;