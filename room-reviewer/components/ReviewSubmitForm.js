import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useSession } from "next-auth/react";

function ReviewSubmitForm() {
    const { data: session } = useSession();
    return (
        <div>
            <Form
                className="reviewForm "
                action="/api/reviews/requests"
                method="post"
            >
                <Form.Group className="mb-1">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        placeholder="Review Title"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Hotel name / Place of stay </Form.Label>
                    <Form.Control type="text" name="location" />
                </Form.Group>

                <input type="hidden" name="author" value={session.user.name} />
                <input type="hidden" name="authorID" value={session.user.id} />

                <Form.Group>
                    <Form.Label htmlFor="rating">
                        How would you rate your experience?
                    </Form.Label>
                    <select className="form-control" name="rating">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="dateVisited">
                        Date of visit:
                    </Form.Label>
                    <Form.Control type="date" name="dateVisited" />
                </Form.Group>

                <Form.Group className="mb-2" controlId="formBasicBody">
                    <Form.Label>
                        Describe your experience <i>(optional)</i>
                    </Form.Label>
                    <textarea
                        className="form-control"
                        name="comment"
                        rows="3"
                    ></textarea>
                    <Button className="submitBTN" type="submit">
                        Submit
                    </Button>
                </Form.Group>
            </Form>
        </div>
    );
}
export default ReviewSubmitForm;
