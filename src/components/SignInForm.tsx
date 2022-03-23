import React from "react";
import loginService from "../services/loginService";
import {User} from "../Interfaces";
import {FieldValues, useForm} from "react-hook-form";

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

type FormInputs = {
    Username: string;
    Password: string;
};
export default function SignInForm({submitUser}: SignInFormProps) {
    const {reset, register, setError, handleSubmit, formState: {errors}} = useForm<FormInputs>({
        defaultValues: {
            Username: '',
            Password: ''
        }
    });

    async function onSubmit(formData: FieldValues) {
        console.log(formData)
        if (formData.Username === '') {
            setError('Username', {type: 'required', message: 'Username is required'})
            return
        } else if (formData.Password === '') {
            setError('Password', {type: 'required', message: 'Password is required'})
            return
        }
        const [user, error] = await asyncRequest(loginService.login({
            username: formData.Username,
            password: formData.Password
        }))
        if (error) {
            if (error.message === 'invalidUsername') {
                console.log("User not found")
                setError('Username', {type: "Server Error", message: 'Invalid username'})
            } else if (error.message === 'invalidPassword') {
                console.log("Password is incorrect")
                setError('Password', {type: "Server Error", message: 'Invalid password'})
            }
            return;
        } else {
            submitUser(user)
        }
        reset();

    }


    return (<form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full max-w-xl px-5 py-10 m-auto mt-10 bg-white rounded-lg shadow border-2">
            <div className="mb-6 text-3xl font-light text-center text-gray-800 dark:text-white">
                Blogs List App
            </div>
            <div className="mb-6 text-3xl font-light text-center text-gray-800 dark:text-white">
                Sign In
            </div>
            {/*<div className='m-2'>*/}

            {/*    <label htmlFor="Name" className="uppercase text-sm text-gray-600 font-bold">Full Name</label>*/}
            {/*    <input type="text" placeholder="Name" {...register("Name", {required: true, maxLength: 80})}*/}
            {/*           className="w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"*/}

            {/*    />*/}
            {/*    {errors.Name && <p>First name is required</p>}*/}
            {/*</div>*/}

            <div className='m-2'>
                <label htmlFor="Username"
                       className="uppercase mt-4 inline-block text-sm text-gray-600 font-bold">Username</label>
                <input id="username" type="text" placeholder="Username" {...register("Username")}
                       className="w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                />
                {errors.Username && <p>{errors.Username.message}</p>}

            </div>
            <div className='m-2'>
                <label htmlFor="Password"
                       className="uppercase mt-4 inline-block text-sm text-gray-600 font-bold">Password</label>
                <input id="password" type="password" placeholder="Password" {...register("Password")}
                       className="w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                />
                {errors.Password && <p>{errors.Password.message}</p>}
            </div>
            {/*TODO: Add styles to Submit Button*/}
            <button id="login-button" type="submit">Login</button>
        </div>
    </form>)
}
