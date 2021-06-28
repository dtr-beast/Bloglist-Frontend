export interface ReceivedBlog {
    title: string
    author: string
    url: string
    likes: number
    id: string

    user: {
        name: string,
        id: string
    }
}