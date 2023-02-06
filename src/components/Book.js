import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Badge, Button, Form, FormGroup, Input, Label, ListGroup, ListGroupItem } from "reactstrap"
import bookService from "../services/bookService"


function Books({books,setBooks}) {
   
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')


    useEffect(() => {
        bookService.getAll()
            .then(response => {
                setBooks(response.data)
                console.log(response.data)
            }).catch(err => console.log(err))

    }, [])
    const handleSubmit = (e) => {
        e.preventDefault()
        bookService.addBook({ title, author })
            .then(response => {
                console.log(response.data)
                setBooks([...books, response.data])
                setAuthor('')
                setTitle('')
            }
            ).catch(err => console.log(err))  
    }

    return (
        <div>
            <h2>List of Books</h2>
            <ListGroup>
                {books.map(book => {
                    return (
                        <ListGroupItem key={book._id}>
                            {book.title} by {book.author}
                            {' '}
                            <Badge pill color="warning">
                                <Link to ={`/books/${book._id}`}>{book.reviews.length} reviews</Link>
                                </Badge>
                        </ListGroupItem>
                    )
                })}
            </ListGroup>

            <br/>
            <Form>
                <FormGroup >
                    <Label for="title">
                        Title
                    </Label>
                    <Input
                        id="title"
                        name="title"
                        placeholder="enter Title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                </FormGroup>
                {' '}
                <FormGroup >
                    <Label for="author">
                        Author
                    </Label>
                    <Input
                        id="author"
                        name="author"
                        placeholder=" Enter Author"
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />

                </FormGroup>
                {' '}
                <Button onClick={handleSubmit}>
                    Add Book
                </Button>
            </Form>


        </div>

    )
}
export default Books