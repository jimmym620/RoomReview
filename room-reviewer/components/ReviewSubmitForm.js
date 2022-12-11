import Form from "react-bootstrap/Form";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

function ReviewSubmitForm() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const { data: session } = useSession();

    const onSubmit = async (data) => {
        try {
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            };
            const response = await fetch(
                "http://localhost:3000/api/reviews/requests",
                requestOptions
            );
            const result = await response.json();
            console.log(result);
            router.push("/reviews");
        } catch (error) {
            console.log(error);
        }
    };

    // console.log(watch("Title"));
    return (
        <div>
            <Form className="reviewForm " onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-1">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        {...register("title", {
                            required: "Title is required",
                        })}
                    ></Form.Control>
                    {errors.title && <span>This field is required</span>}
                </Form.Group>
                <Form.Group>
                    <Form.Label>Hotel name / Place of stay </Form.Label>
                    <Form.Control
                        {...register("location", { required: true })}
                    ></Form.Control>
                    {errors.location && <span>This field is required</span>}
                </Form.Group>

                <input
                    type="hidden"
                    {...register("author")}
                    value={session.user.name}
                />
                <input
                    type="hidden"
                    {...register("authorID")}
                    value={session.user.id}
                />

                <Form.Group>
                    <Form.Label htmlFor="rating">
                        How would you rate your experience?
                    </Form.Label>
                    <select {...register("rating")} className="form-control">
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
                        {...register("dateVisited", { required: true })}
                        type="date"
                    />
                    {errors.dateVisited && <span>This field is required</span>}
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicBody">
                    <Form.Label>
                        Describe your experience <i>(optional)</i>
                    </Form.Label>
                    <textarea
                        className="form-control"
                        {...register("comment")}
                        rows="3"
                    ></textarea>
                    <input className="submitBTN" type="submit" />
                </Form.Group>
            </Form>
        </div>
    );
}
export default ReviewSubmitForm;
