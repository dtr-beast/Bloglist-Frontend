import React from "react";
import {render, fireEvent, RenderResult} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'

import BlogForm from "../Components/BlogForm";

describe('<BlogForm/>', () => {

    let component: RenderResult<typeof import("@testing-library/dom/types/queries")>
    const onSubmit = jest.fn()
    beforeEach(() => {
        component = render(
            <BlogForm onSubmit={onSubmit}/>
        )
    })
    test('Correct props are sent to event handler at form submission', () => {
        const titleInput = component.container.querySelector<HTMLInputElement>('#title')
        const authorInput = component.container.querySelector<HTMLInputElement>('#author')
        const urlInput = component.container.querySelector<HTMLInputElement>('#url')

        const blog = {
            title: "God Of War",
            author: "George RR Martin",
            url: "https://www.facebook.com"
        }

        if (titleInput instanceof HTMLInputElement) {
            fireEvent.change(titleInput, {target: {value: blog.title}})
        }
        if (authorInput instanceof HTMLInputElement) {
            fireEvent.change(authorInput, {target: {value: blog.author}})
        }
        if (urlInput instanceof HTMLInputElement) {
            fireEvent.change(urlInput, {target: {value: blog.url}})
        }
        const form = component.container.querySelector<HTMLFormElement>('form')
        if (form instanceof HTMLFormElement) {
            fireEvent.submit(form)
        }

        expect(onSubmit.mock.calls[0][0]).toMatchObject(blog)
    })
})
