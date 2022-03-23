import {ReceivedBlog, User} from "../Interfaces";
import Toggleable from "./Toggleable";
import BlogForm from "./BlogForm";
import React from "react";

interface DashboardParams {
    user: User;
    blogs: ReceivedBlog[];
    addBlog: (blog: ReceivedBlog) => void;
    deleteBlog: (id: string) => void;
}

export default function Dashboard(props: { user: User, onLogout: () => void, onSubmit: (newBlog: any) => Promise<void>, receivedBlogs: ReceivedBlog[], callbackfn: (blog: any) => JSX.Element }) {

    return <>
        <p className="text-xl">{props.user.name} Logged In</p>
        <button type="button" onClick={props.onLogout}>Log Out</button>
        <Toggleable buttonLabel="Create New Blog">
            <BlogForm onSubmit={props.onSubmit}/>
        </Toggleable>
        <br/>
        {
            props.receivedBlogs.map(
                props.callbackfn
            )
        }
    </>;
}
