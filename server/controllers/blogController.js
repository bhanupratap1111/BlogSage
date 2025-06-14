import fs from 'fs';
import imageKit from '../config/imageKit.js';
import Blog from '../models/blog.model.js';
import Comment from '../models/comment.model.js';

export const addBlog = async (req, res) => {
    try {
        const { title, subTitle, description, category, author, isPublished } = JSON.parse(req.body.blog);

        const imageFile = req.file;

        // Validate input
        if (!title || !description || !author || !category || !imageFile) {
            return res.json({success: false, message: "All fields are required" });
        }

        const fileBuffer = fs.readFileSync(imageFile.path);
        const response = await imageKit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: '/blogs',
        })
        fs.unlinkSync(imageFile.path);

        //optimise image through imageKit url transformation
        const optimisedImageUrl = imageKit.url({
            path: response.filePath,
            transformation: [
                {quality: "auto"},
                {width: "1280"},
                {format: "webp"},
            ]
        })
        const image = optimisedImageUrl;

        const newBlog = await Blog.create({ 
            title, 
            subTitle, 
            description, 
            category, 
            author, 
            image,
            imageFileId: response.fileId,
            isPublished 
        });

        console.log("New blog post created:", newBlog);
        res.json({success:true, message: "Blog added successfully", });
    } catch (error) {
        console.error("Error creating blog post:", error);
        res.json({success:false, message: error.message });
    }
}


export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ isPublished: true }).sort({ createdAt: -1 });     
        res.json({success:true, blogs});
    } catch (error) {
        console.error("Error fetching blogs:", error);
        res.json({success:false, message: error.message });
    }
}


export const getBlogById = async (req, res) => {
    try {
        const { blogId } = req.params;
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.json({success:false, message: "Blog not found" });
        }   
        res.json({success:true, blog});
    } catch (error) {
        console.error("Error fetching blog by ID:", error);
        res.json({success:false, message: error.message });
    }       
}


export const deleteBlogById = async (req, res) => {
    try {
        const { id } = req.body;
        const blog = await Blog.findByIdAndDelete(id);
        if (!blog) {
            return res.json({success:false, message: "Blog not found" });
        }

        await Comment.deleteMany({ blogId: id });

        if (blog.imageFileId) {
            await imageKit.deleteFile(blog.imageFileId);
        }

        res.json({success:true, message: "Blog deleted successfully" });
    } catch (error) {
        console.error("Error deleting blog:", error);
        res.json({success:false, message: error.message });
    }
}


export const togglePublishStatus = async (req, res) => {
    try {
        const { id } = req.body;
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.json({success:false, message: "Blog not found" });
        }
        blog.isPublished = !blog.isPublished;
        await blog.save();
        res.json({success:true, message: "Blog status updated" });           
    }
    catch (error) {
        console.error("Error toggling publish status:", error);
        res.json({success:false, message: error.message });
    }
}


export const addComment = async (req, res) => {
    try {
        const { blogId, name, content } = req.body;

        // Validate input
        if (!blogId || !name || !content) {
            return res.json({success:false, message: "All fields are required" });
        }

        await Comment.create({ 
            blogId, 
            name, 
            content 
        });

        res.json({success:true, message: "Comment added for review"});
    } catch (error) {
        console.error("Error adding comment:", error);
        res.json({success:false, message: error.message });
    }
}


export const getBlogComments = async (req, res) => {
    try {
        const { blogId } = req.body;

        if (!blogId) {
            return res.json({success:false, message: "Blog ID is required" });
        }

        const comments = await Comment.find({ blogId, isApproved: true }).sort({ createdAt: -1 });
        res.json({success:true, comments});
    } catch (error) {
        console.error("Error fetching blog comments:", error);
        res.json({success:false, message: error.message });
    }
}