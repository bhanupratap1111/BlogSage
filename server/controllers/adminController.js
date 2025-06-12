import jwt from 'jsonwebtoken';

export const adminLogin = async(req, res) => {
    try{
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        // Check credentials (this is a placeholder, replace with actual authentication logic)
        if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
            return res.status(401).json({ message: "Invalid credentials" });
        } 

        const token = jwt.sign(
            { email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error("Error during admin login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}