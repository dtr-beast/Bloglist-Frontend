import React, {useEffect, useState} from 'react'

import Blog from 'components/Blog'
import SignInForm from "components/SignInForm";
import Dashboard from "./components/Dashboard";
import Toggleable from "components/Toggleable";
import blogService from './services/blogService'
import {ReceivedBlog, User} from "./Interfaces";

const compareBlogs = (a: ReceivedBlog, b: ReceivedBlog) => a.likes > b.likes ? -1 : 1

function App() {
    const [blogs, setBlogs] = useState<ReceivedBlog[]>([])

    // User Details
    const [user, setUser] = useState<User | null>(null)


    async function downloadBlogs() {
        const blogs = await blogService.getAll()
        blogs.sort(compareBlogs)
        setBlogs(blogs)
    }


    useEffect(() => {
        (async () => {
            const token = window.localStorage.getItem('loggedBlogAppUser')
            if (token) {
                const user = JSON.parse(token)
                setUser(user)
                blogService.setToken(user.token)
                await downloadBlogs()
            }
        })()
    }, [])

    async function submitUser(user: User) {
        window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
        setUser(user)
        await downloadBlogs()
    }

    function handleLogout() {
        window.localStorage.removeItem('loggedBlogAppUser')
        setUser(null)
        setBlogs([])
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
        const updatedBlog = await blogService.update({...blog, likes: blog.likes + 1})
        setBlogs(prevBlogs => {
            const newBlogs = prevBlogs.filter(blog => blog.id !== updatedBlog.id)
            newBlogs.push(updatedBlog)
            return newBlogs.sort(compareBlogs)
        })
        // await downloadBlogs()
    }

    async function handleDelete(blog: ReceivedBlog) {
        if (window.confirm(`Remove blog: "${blog.title}" By ${blog.author} ?`)) {
            if (await blogService.deleteBlog(blog.id)) {
                // TODO: Find a better solution that doesn't require downloading all the blogs again,
                //  rather remove the one deleted blog from the array `blogs` itself
                setBlogs(prevBlogs => prevBlogs
                    .filter(currentBlog => currentBlog.id !== blog.id)
                    .sort(compareBlogs)
                )
                // await downloadBlogs()
            } else {
                alert(`Failed to remove the blog ${blog.title} By ${blog.author}`)
            }
        }
    }

    return <div className="m-10">
        {/*<h2 className="text-5xl font-bold underline">Blogs</h2>*/}
        {
            user === null ?
                <SignInForm submitUser={submitUser}/> :
                // TODO Refine
                <Dashboard user={user} onLogout={handleLogout} onSubmit={handleBlog} receivedBlogs={blogs}
                           callbackfn={blog => {
                               return (
                                   <Toggleable key={blog.id} buttonLabel="View">
                                       <Blog blog={blog} onLike={handleLike} onDelete={handleDelete}/>
                                   </Toggleable>
                               )
                           }}/>
        }
    </div>

}

export default App
