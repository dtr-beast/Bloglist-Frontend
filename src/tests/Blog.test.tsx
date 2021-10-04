import React from "react";
import {render, fireEvent, RenderResult} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'

import Blog from '../Components/Blog'
import {ReceivedBlog} from "../Interfaces";

describe('<Blog/>', () => {
    let component: RenderResult<typeof import("@testing-library/dom/types/queries")>
    const blog: ReceivedBlog = {
        title: "Its my Home Diary!",
        author: "Abraham Lincoln",
        likes: 15,
        url: "https://facebook.com",
        user: {
            id: "randomUserID",
            name: "Aditya Sharma"
        },
        id: "randomBlogID"
    }

    const onLike = jest.fn()
    const onDelete = jest.fn()

    beforeEach(() => {
        component = render(
            <Blog blog={blog} onLike={onLike} onDelete={onDelete}/>
        )
    })

    test('If Like is pressed twice, the event handler onLike is also called twice', () => {
        const likeButton = component.getByText('Like')

        fireEvent.click(likeButton)
        expect(onLike.mock.calls).toHaveLength(1)

        fireEvent.click(likeButton)
        expect(onLike.mock.calls).toHaveLength(2)
    })
})
