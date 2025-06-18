import fs from 'fs';
import imageKit from '../config/imageKit.js';
import Blog from '../models/blog.model.js';
import Comment from '../models/comment.model.js';
import main from '../config/gemini.js';
import { Resend } from 'resend';
import Newsletter from '../models/newsletter.model.js';

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

        const emails = ['blogsage.app@gmail.com'];

        if (emails.length > 0) {
        const resend = new Resend(process.env.RESEND_API_KEY);

        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: emails,
            subject: `New Blog Posted: ${newBlog.title}`,
            html: `<p>A new blog titled "<strong>${newBlog.title}</strong>" has been posted. <a href="http://localhost:3000">Read it now!</a></p>`,
        });
        }

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

        const updatedBlog = await Blog.findByIdAndUpdate(
            id,
            { isPublished: !blog.isPublished },
            { new: true } // return updated document
        );
        
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


export const generateContent = async (req, res) => {
    try {
        const { prompt } = req.body;
        if (!prompt) {
            return res.json({success:false, message: "Prompt is required" });
        }

        const content = await main(prompt + 'Generate a blog post based on this prompt. The content should be engaging, informative, and suitable for a general audience.');
        res.json({success:true, content});
    } catch (error) {
        console.error("Error generating content:", error);
        res.json({success:false, message: error.message });
    }
}