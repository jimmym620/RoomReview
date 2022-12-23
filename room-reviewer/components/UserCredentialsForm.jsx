import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";

export default function UserCredentialsForm(type) {
    const [formType, setFormType] = useState(type);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    //////////////////////////////////////////////////
    if (type === "register") {
    } else {
    }
    //////////////////////////////////////////////////

    const onSubmit = async (data) => {
        //   try {
        //       const requestOptions = {
        //           method: "POST",
        //           headers: { "Content-Type": "application/json" },
        //           body: JSON.stringify(data),
        //       };
        //       await fetch(
        //           "http://localhost:3000/api/reviews/requests",
        //           requestOptions
        //       );
        //       router.push("/reviews");
        //       return;
        //   } catch (error) {
        //       return console.log(error);
        //   }
    };

    return (
        <div>
            <Form className="registerForm" onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        {...register("email", {
                            required: "Email required",
                        })}
                    ></Form.Control>
                    {errors.email && <span>This field is required</span>}
                </Form.Group>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        {...register("username", {
                            required: "Username required",
                        })}
                    ></Form.Control>
                    {errors.username && <span>This field is required</span>}
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        {...register("password", {
                            required: "Password required",
                        })}
                    ></Form.Control>
                    {errors.password && <span>This field is required</span>}
                </Form.Group>
                <Button className="submitBTN" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}
