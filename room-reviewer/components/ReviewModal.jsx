import { useForm } from "react-hook-form";
import Router from "next/router";
import moment from "moment";

export default function ReviewModal({
    title,
    location,
    rating,
    dateVisited,
    comment,
}) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    return (
        <div>
            <div>
                <h1>Edit: {location}</h1>

                <div>
                    <form
                        className="flex flex-col gap-3 "
                        onSubmit={handleSubmit(onFormSubmit)}
                    >
                        <section className="flex flex-col gap-2">
                            <label>Title:</label>
                            <input
                                className="border rounded p-2"
                                type="text"
                                defaultValue={title}
                                {...register("title")}
                            />
                        </section>

                        {errors.title && <span>This field is required</span>}

                        <section className="flex flex-col gap-2">
                            <label>Hotel name / Place of stay </label>
                            <input
                                className="border rounded p-2"
                                {...register("location")}
                                defaultValue={location}
                            ></input>
                        </section>

                        <section className="flex flex-col gap-2">
                            <label htmlFor="rating">
                                How would you rate your experience?
                            </label>
                            <select
                                {...register("rating")}
                                className="border rounded p-2"
                                defaultValue={rating}
                            >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </section>
                        <section className="flex gap-2 justify-between ">
                            <label>Date of visit:</label>
                            <input
                                className="border rounded p-2"
                                {...register("dateVisited")}
                                type="date"
                                defaultValue={moment(dateVisited).format(
                                    "YYYY-MM-DD"
                                )}
                            />
                        </section>
                        <section className="flex flex-col gap-2">
                            <label>
                                Describe your experience <i>(optional)</i>
                            </label>
                            <textarea
                                className="border rounded p-2"
                                {...register("comment")}
                                defaultValue={comment}
                                rows="3"
                            ></textarea>
                        </section>
                    </form>
                </div>
            </div>
        </div>
    );
}

const onFormSubmit = async (data) => {
    try {
        const requestOptions = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };
        await fetch(
            "/api/reviews/requests?" + new URLSearchParams({ reviewId: id }),
            requestOptions
        ).then((response) => {
            // If success, close modal and redirect to dashboard
            if (response.ok) {
                close();
                Router.reload(window.location.pathname);
            }
        });
    } catch (error) {
        console.log(error);
    }
};
