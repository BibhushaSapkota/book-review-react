import { Button, Card, CardBody, CardText, CardTitle, ListGroup, ListGroupItem, Form,FormGroup,Label,Input } from "reactstrap"
import { useEffect, useState } from "react"
import bookService from "../services/bookService"

function BookDetail({ book }) {
    const [review, setReview] = useState('')

    const [reviews, setReviews] = useState([])
    useEffect(() => {
        bookService.getAllReviews(book._id)
            .then(response => {
                console.log(response.data)
                setReviews(response.data)
            }).catch(err => console.log(err))
    }, [book])

    const handleSubmit = (e) => {
        e.preventDefault()
        bookService.addReview(book._id, { body: review })
            .then(response => {
                console.log(response.data)
                setReview('')
            }).catch(err => console.log(err))
    }
    return (
        <div>

            <Card
                style={{
                    width: '18rem'
                }}
            >

                <CardBody>
                    <CardTitle tag="h5">
                        {book.title}
                    </CardTitle>
                    <CardText>
                        {book.author}
                    </CardText>
                </CardBody>
                <ListGroup>
                {reviews.map(review => {
                    return (
                        <ListGroupItem key={review._id}>
                            {review.body} by {review.reviewer.username}
                        </ListGroupItem>
                    )
                })}
            </ListGroup>
            </Card>

            <Form>
                <FormGroup >
                    <Label for="review">
                        Review
                    </Label>
                    <Input
                        id="review"
                        name="review"
                        placeholder="enter your review"
                        type="text"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                    />

                </FormGroup>
                {' '}
                <Button onClick={handleSubmit}>
                    Add Review
                </Button>
            </Form>
            

        </div>
    )
}

export default BookDetail