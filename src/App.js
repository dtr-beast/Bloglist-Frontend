import React, {useState, useEffect} from 'react'
import Blog from './Components/Blog'
import blogService from './services/blogService'
import loginService from "./services/loginService";
import {Button, TextField} from "@material-ui/core";


const App = () => {
    const [blogs, setBlogs] = useState([])

    // User Details
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    // Blog Details
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])

    useEffect(() => {
        const token = window.localStorage.getItem('loggedBlogAppUser')
        if (token) {
            const user = JSON.parse(token)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    async function handleLogin(event) {
        event.preventDefault()
        try {
            const user = await loginService.login({username, password})
            window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
            setUser(user)
        } catch (e) {
            console.log('Login Failed')
            console.log(e)
        }
    }

    const loginForm = () => (
        <>
            <h2>Log into Application</h2>
            <form onSubmit={handleLogin}>
                <div>
                    Username:
                    <TextField
                        type="text"
                        variant="outlined"
                        placeholder="Username"
                        onChange={({target}) => setUsername(target.value)}
                        color="secondary"
                        value={username}
                        name="Username"
                    />

                </div>
                <div>
                    Password:
                    <TextField
                        type="password"
                        variant="outlined"
                        placeholder="Password"
                        onChange={({target}) => setPassword(target.value)}
                        color="secondary"
                        value={password}
                        name="Password"
                    />
                </div>
                <Button type="submit" variant="contained" color="primary" disableElevation>Login</Button>
            </form>
        </>

    )

    function handleLogout() {
        setUser(null)
        window.localStorage.removeItem('loggedBlogAppUser')
    }

    async function handleBlog(ev) {
        ev.preventDefault()
        const newBlog = {
            title,
            author,
            url,
        }
        console.log(newBlog)
        try {
            const data = await blogService.create(newBlog)
            setBlogs([blogs, newBlog])
            setUrl('')
            setAuthor('')
            setTitle('')
            console.log(data)
        } catch (e) {
            console.log('Error')
            console.log(e)
        }

    }


    return (
        <div>
            <h2>Blogs</h2>
            {
                user === null ?
                    loginForm() :
                    <>
                        <p>{user.name} logged-in <button type="button" onClick={handleLogout}>Log Out</button></p>

                        <form onSubmit={handleBlog}>
                            Title
                            <input
                                type="text"
                                value={title}
                                name="title"
                                onChange={({target}) => setTitle(target.value)}
                            />
                            Author
                            <input
                                type="text"
                                value={author}
                                name="author"
                                onChange={({target}) => setAuthor(target.value)}
                            />
                            URL
                            <input
                                type="text"
                                value={url}
                                name="Url"
                                onChange={({target}) => setUrl(target.value)}
                            />
                            <button type="submit">Submit</button>
                        </form>
                        {
                            blogs.map(
                                blog =>
                                    <Blog key={blog.id} blog={blog}/>
                            )
                        }
                    </>
            }

        </div>
    )
}

export default App