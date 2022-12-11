import { Button, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

function ReviewModal({
    close,
    id,
    title,
    location,
    rating,
    dateVisited,
    comment,
}) {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const requestOptions = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            };
            const response = await fetch(
                "http://localhost:3000/api/reviews/requests?" +
                    new URLSearchParams({ reviewId: id }),
                requestOptions
            );
            const result = await response.json();
            console.log(result);
            router.push("/dashboard");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Modal.Header>
                <Modal.Title>Edit {title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="reviewForm " onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-1">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            {...register("title")}
                            defaultValue={title}
                        ></Form.Control>
                        {errors.title && <span>This field is required</span>}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Hotel name / Place of stay </Form.Label>
                        <Form.Control
                            {...register("location")}
                            defaultValue={location}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label htmlFor="rating">
                            How would you rate your experience?
                        </Form.Label>
                        <select
                            {...register("rating")}
                            className="form-control"
                            defaultValue={rating}
                        >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Date of visit:</Form.Label>
                        <Form.Control
                            {...register("dateVisited")}
                            type="date"
                            defaultValue={dateVisited}
                        />
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="formBasicBody">
                        <Form.Label>
                            Describe your experience <i>(optional)</i>
                        </Form.Label>
                        <textarea
                            className="form-control"
                            {...register("comment")}
                            defaultValue={comment}
                            rows="3"
                        ></textarea>
                        <input className="submitBTN" type="submit" />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={close}>
                    Cancel
                </Button>
                <Button
                    variant="primary"
                    onClick={() => {
                        close();
                        //SUBMIT PATCH REQUEST
                    }}
                >
                    Save Changes
                </Button>
            </Modal.Footer>
        </>
    );
}

export default ReviewModal;
