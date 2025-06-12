import fs from 'fs';
import imageKit from '../config/imageKit.js';
import Blog from '../models/blog.model.js';

export const addBlog = async (req, res) => {
    try {
        const { title, subTitle, description, category, author, isPublished } = JSON.parse(req.body.blog);

        const imageFile = req.file;

        // Validate input
        if (!title || !description || !author || !category || !imageFile) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const fileBuffer = fs.readFileSync(imageFile.path);
        const response = await imageKit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: '/blogs',
        })

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
            isPublished 
        });

        console.log("New blog post created:", newBlog);
        res.status(201).json({ message: "Blog post created successfully", });
    } catch (error) {
        console.error("Error creating blog post:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ isPublished: true }).sort({ createdAt: -1 });     
        res.status(200).json(blogs);
    } catch (error) {
        console.error("Error fetching blogs:", error);
        res.status(500).json({ message: error.message });
    }
}


export const getBlogById = async (req, res) => {
    try {
        const { blogId } = req.params;
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }   
        res.status(200).json(blog);
    } catch (error) {
        console.error("Error fetching blog by ID:", error);
        res.status(500).json({ message: error.message });
    }       
}


export const deleteBlogById = async (req, res) => {
    try {
        const { id } = req.body;
        const blog = await Blog.findByIdAndDelete(id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        console.error("Error deleting blog:", error);
        res.status(500).json({ message: error.message });
    }
}


export const togglePublishStatus = async (req, res) => {
    try {
        const { id } = req.body;
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        blog.isPublished = !blog.isPublished;
        await blog.save();
        res.status(200).json({ message: `Blog ${blog.isPublished ? 'published' : 'unpublished'} successfully` });           
    }
    catch (error) {
        console.error("Error toggling publish status:", error);
        res.status(500).json({ message: error.message });
    }
}


export const addComment = async (req, res) => {
    try {
        const { blogId, name, content } = req.body;

        // Validate input
        if (!blogId || !name || !content) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        blog.comments.push({ name, content });
        await blog.save();

        res.status(201).json({ message: "Comment added successfully", comments: blog.comments });
    } catch (error) {
        console.error("Error adding comment:", error);
        res.status(500).json({ message: error.message });
    }
}