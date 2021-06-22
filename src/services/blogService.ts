import axios from 'axios'

const URL = '/api/blogs'
let token: String

const getAll = () => {
    const request = axios.get(URL)
    return request.then(response => response.data)
}
function setToken (newToken: String) {
    token = `bearer ${newToken}`
}

async function create(blog: any) {
    const response = await axios.post(URL, blog, {headers: {authorization: token}})
    return response.data
}

const defaultExports = {getAll, setToken, create}

export default defaultExports