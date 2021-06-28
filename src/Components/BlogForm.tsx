import React, {useState} from "react";
import {Blog} from "../Models/blog.model";

interface BlogFormProps {
    onSubmit: (newBlog: Blog) => void,
}

function BlogForm({onSubmit}: BlogFormProps) {

    // Blog Details
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const newBlog = {
            title: title,
            author: author,
            url: url
        }
        onSubmit(newBlog)
        setUrl('')
        setAuthor('')
        setTitle('')
    }

    return <>
        <h2>Create New Blog</h2>
        <form onSubmit={handleSubmit}>
            <h3>Title</h3>
            <input
                type="text"
                value={title}
                name="title"
                onChange={({target}) => setTitle(target.value)}
            />
            <br/>
            <h3>Author</h3>
            <input
                type="text"
                value={author}
                name="author"
                onChange={({target}) => setAuthor(target.value)}
            />
            <br/>
            <h3>URL</h3>
            <input
                type="text"
                value={url}
                name="Url"
                onChange={({target}) => setUrl(target.value)}
            />
            <br/>
            <button type="submit">Submit</button>
            <br/>
            <br/>
        </form>
    </>;
}

export default BlogForm