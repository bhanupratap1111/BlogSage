import jwt from 'jsonwebtoken';
import Blog from '../models/blog.model.js';
import Comment from '../models/comment.model.js';

export const adminLogin = async(req, res) => {
    try{
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.json({success:false, message: "Username and password are required" });
        }

        // Check credentials (this is a placeholder, replace with actual authentication logic)
        if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
            return res.json({success:false, message: "Invalid credentials" });
        } 

        const token = jwt.sign(
            { email },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );
        res.json({success:true, token});
    } catch (error) {
        console.error("Error during admin login:", error);
        res.json({success:false, message: error.message });
    }
}


export const getAllBlogsAdmin = async (req, res) => {
    try {
        const blogs = await Blog.find({}).sort({ createdAt: -1 });
        res.json({success:true, blogs});
    } catch (error) {
        console.error("Error fetching blogs:", error);
        res.json({success:false, message: error.message });
    }
}


export const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find({}).populate("blogId").sort({ createdAt: -1 });
        res.json({success:true, comments});
    } catch (error) {
        console.error("Error fetching comments:", error);
        res.json({success:false, message: error.message });
    }
}


export const getDashBoard = async (req, res) => {
    try {
        const blogs = await Blog.countDocuments();
        const comments = await Comment.countDocuments();
        const recentBlogs = await Blog.find({}).sort({ createdAt: -1 }).limit(5);
        const drafts = await Blog.countDocuments({ isPublished: false });

        const dashboardData = {
            blogs,
            comments,
            recentBlogs,
            drafts
        };
        res.json({success : true, dashboardData})
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        res.json({success:false, message: error.message });
    }
}


export const deleteCommentById = async (req, res) => {
    try {
        const { id } = req.body;
        const comment = await Comment.findByIdAndDelete(id);
        if (!comment) {
            return res.json({success:false, message: "Comment not found" });
        }
        res.json({success:true, message: "Comment deleted successfully" });
    } catch (error) {
        console.error("Error deleting comment:", error);
        res.json({success:false, message: error.message });
    }
}


export const approveCommentById = async (req, res) => {
    try {
        const { id } = req.body;
        const comment = await Comment.findByIdAndUpdate(id, { isApproved: true }, { new: true });
        if (!comment) {
            return res.json({success:false, message: "Comment not found" });
        }
        res.json({success:true, message: "Comment approved successfully" });
    } catch (error) {
        console.error("Error approving comment:", error);
        res.json({success:false, message: error.message });
    }
}

