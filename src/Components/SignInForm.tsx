import {TextField, Button} from "@mui/material";
import React from "react";
import {useTextField} from "../hooks";
import loginService from "../services/loginService";
import {User} from "../Interfaces";

interface SignInFormProps {
    submitUser: (user: User) => void
}

async function asyncRequest(promise: Promise<any>) {
    try {
        const data = await promise
        return [data, null]
    } catch (error) {
        return [null, error]
    }
}

function SignInForm({submitUser}: SignInFormProps) {
    // Login Details
    // TODO: Find how to hide extra parameters from the input element
    const username = useTextField('Username')
    const password = useTextField('Password', 'password')

    return <>
        <h2>Sign In</h2>
        <form onSubmit={async (event) => {
            event.preventDefault()

            username.reset()
            password.reset()

            // Cancel request if username field is empty
            if (username.value === '') {
                username.setError(true)
                username.setHelperText("Enter a username")
                return;
            }

            const [user, error] = await asyncRequest(loginService.login({
                username: username.value,
                password: password.value
            }))

            if (error) {
                if (error.message === 'invalidUsername') {
                    username.setError(true)
                    username.setHelperText("Couldn't find your account")
                } else if (error.message === 'invalidPassword') {
                    console.log("Wrong Pass")
                    password.setError(true)
                    password.setHelperText("Wrong Password")
                }
            } else {
                submitUser(user)
            }
        }}>
            <div>
                Username:
                {/*TODO: Figure out a way to solve the HTML warning due to reset()*/}
                <TextField {...username}/>
            </div>
            <hr/>
            <div>
                Password:
                {/*TODO: Figure out a way to solve the HTML warning due to reset()*/}
                <TextField {...password}/>
            </div>
            <Button id="login-button" type="submit" variant="contained" color="primary">Login</Button>
        </form>
    </>
}

export default SignInForm
