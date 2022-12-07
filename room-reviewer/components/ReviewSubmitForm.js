import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function ReviewSubmitForm() {
    return (
        <div>
            <Form className="reviewForm w-25">
                <Form.Group className="mb-1" controlId="formBasicTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        id="reviewTitle"
                        placeholder="Enter Title"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label for="reviewRating">
                        How would you rate your experience ?
                    </Form.Label>
                    <select class="form-control" id="reviewRating">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                </Form.Group>

                <Form.Group className="mb-2" controlId="formBasicBody">
                    <Form.Label>Body</Form.Label>
                    <textarea
                        class="form-control"
                        id="reviewBody"
                        rows="3"
                    ></textarea>{" "}
                    <Button className="submitBTN" type="submit">
                        Submit
                    </Button>
                </Form.Group>
            </Form>
        </div>
    );
}
export default ReviewSubmitForm;
