import React from 'react'
import {ReceivedBlog} from "../Interfaces";

interface BlogProps {
    blog: ReceivedBlog
    onLike: (blog: ReceivedBlog) => void
    onDelete: (blog: ReceivedBlog) => void
}

function Blog({blog, onLike, onDelete}: BlogProps) {
    const style = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }
    return (
        <div style={style}>
            <br/>
            <p><a href={blog.url}>{blog.title}</a> By {blog.author}</p>
            {blog.likes} Likes
            <br/>
            <button onClick={() => onLike(blog)}>Like</button>
            <br/>
            <button onClick={() => onDelete(blog)}>Remove</button>
            <br/>
        </div>
    )
}

export default Blog