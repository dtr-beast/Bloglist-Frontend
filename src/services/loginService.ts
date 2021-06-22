import axios from 'axios'

const URL = '/api/login'

interface CredentialParams {
    username: String,
    password: String
}

const login = async (credentials: CredentialParams) => {
    const response = await axios.post(URL, credentials)
    return response.data
}

const defaultExports = {login}
export default defaultExports