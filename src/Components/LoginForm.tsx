import {Button, TextField} from "@material-ui/core";
import React, {useState} from "react";

interface LoginFormProps {
    onSubmit: (username: string, password: string) => void
}

function LoginForm({onSubmit}: LoginFormProps) {
    // Login Details
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    return <>
        <h2>Log into Application</h2>
        <form onSubmit={(event) => {
            event.preventDefault()
            onSubmit(username, password)
            setUsername('')
            setPassword('')
        }}>
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
}

export default LoginForm