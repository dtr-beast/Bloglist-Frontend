import React, {useEffect, useState} from 'react'

import Blog from './Components/Blog'
import BlogForm from "./Components/BlogForm";
import LoginForm from "./Components/LoginForm";

import loginService from "./services/loginService";
import Toggleable from "./Components/Toggleable";
import blogService from './services/blogService'
import {ReceivedBlog, User} from "./Interfaces";

function App() {
    const [blogs, setBlogs] = useState<ReceivedBlog[]>([])

    // User Details
    const [user, setUser] = useState<User | null>(null)

    async function downloadBlogs() {
        function compareBlogs(a: ReceivedBlog, b: ReceivedBlog) {
            if (a.likes > b.likes) {
                return -1
            }
            if (a.likes < b.likes) {
                return 1
            }
            return 0
        }
        const blogs = await blogService.getAll()
        blogs.sort(compareBlogs)
        setBlogs(blogs)
    }

    useEffect(() => {
        downloadBlogs()
    }, [])

    useEffect(() => {
        const token = window.localStorage.getItem('loggedBlogAppUser')
        if (token) {
            const user = JSON.parse(token)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    async function handleLogin(username: string, password: string) {
        try {
            const user = await loginService.login({username, password})
            window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
            setUser(user)
        } catch (e) {
            console.log('Login Failed')
            console.log(e)
        }
    }

    function handleLogout() {
        setUser(null)
        window.localStorage.removeItem('loggedBlogAppUser')
    }

    async function handleBlog(newBlog: any) {
        try {
            const createdBlog = await blogService.create(newBlog)
            setBlogs([...blogs, createdBlog])
        } catch (e) {
            console.log('Error')
            console.log(e)
        }
    }

    // TODO: Improve this, downloading all the blogs again is tedious, change it so only the certain blog is
    //  updated. Search how to rerender the particular Blog component using its ID or something
    async function handleLike(blog: ReceivedBlog) {
        await blogService.update({...blog, likes: blog.likes + 1})
        await downloadBlogs()
    }

    async function handleDelete(blog: ReceivedBlog) {
        if (window.confirm(`Remove blog: "${blog.title}" By ${blog.author} ?`)) {
            if (await blogService.deleteBlog(blog.id)) {
                // TODO: Find a better solution that doesn't require downloading all the blogs again,
                //  rather remove the one deleted blog from the array `blogs` itself
                await downloadBlogs()
            }
            else {
                alert(`Failed to remove the blog ${blog.title} By ${blog.author}`)
            }
        }
    }


    return <>
        <h2>Blogs</h2>
        {
            user === null ?
                <LoginForm onSubmit={handleLogin}/> :
                <>
                    <p>{user.name} logged-in <button type="button" onClick={handleLogout}>Log Out</button></p>
                    <Toggleable buttonLabel="Create New Blog">
                        <BlogForm onSubmit={handleBlog}/>
                    </Toggleable>
                    <br/>
                    {
                        blogs.map(
                            blog => {
                                return (
                                    <Toggleable key={blog.id} buttonLabel="View">
                                        <Blog blog={blog} onLike={handleLike} onDelete={handleDelete}/>
                                    </Toggleable>
                                )
                            }
                        )
                    }
                </>
        }
    </>

}

export default App