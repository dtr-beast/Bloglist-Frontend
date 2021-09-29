import axios from 'axios'
import {ReceivedBlog} from '../Interfaces'
import {Blog} from "../Models/blog.model";

const URL = '/api/blogs'
let token: String

async function getAll(): Promise<ReceivedBlog[]> {
    const response = await axios.get(URL)
    return response.data
}

async function create(blog: Blog): Promise<ReceivedBlog> {
    const response = await axios.post(URL, blog, {headers: {authorization: token}})
    return response.data
}

async function update(blog: ReceivedBlog): Promise<ReceivedBlog> {
    console.log(blog);
    // @ts-ignore
    blog.user = blog.user.id
    const response = await axios.put(`${URL}/${blog.id}`, blog, {headers: {authorization: token}})
    return response.data
}

async function deleteBlog(blogId: string): Promise<boolean> {
    const response = await axios.delete(`${URL}/${blogId}`, {headers: {authorization: token}})
    return response.status === 204
}

function setToken(newToken: String) {
    token = `bearer ${newToken}`
}

const defaultExports = {getAll, setToken, create, update, deleteBlog}

export default defaultExports
