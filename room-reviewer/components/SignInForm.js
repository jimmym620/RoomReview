import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function SignInForm() {
    return (
        <div>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="green-text">
                        This will be your username.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Button className="submitBTN" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}
export default SignInForm;
