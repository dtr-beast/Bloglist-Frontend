export class Blog {
    title: string
    author: string
    url: string

    constructor({title, author, url}: { title: string, author: string, url: string }) {
        this.title = title
        this.author = author
        this.url = url
    }
}