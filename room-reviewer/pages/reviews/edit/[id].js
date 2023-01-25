import { useForm } from "react-hook-form";
import connectMongo from "../../../mongoDB/connectDB";
import moment from "moment";
import Review from "../../../mongoDB/models/reviewModel";
import { useRouter } from "next/router";

export default function Edit({ result }) {
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
            await fetch(
                "/api/reviews/requests?" +
                    new URLSearchParams({ reviewId: result._id }),
                requestOptions
            ).then((response) => {
                // If success, close modal and redirect to dashboard
                if (response.ok) {
                    router.push("/reviews");
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="w-4/5 m-auto">
            <div>
                <h1>Edit: {result.location}</h1>

                <form
                    className="flex flex-col gap-3 "
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <section className="flex flex-col gap-2">
                        <label>Title:</label>
                        <input
                            type="hidden"
                            defaultValue={result._id}
                            {...register("id")}
                        />
                        <input
                            className="border rounded p-2"
                            type="text"
                            defaultValue={result.title}
                            {...register("title")}
                        />
                    </section>

                    {errors.title && <span>This field is required</span>}

                    <section className="flex flex-col gap-2">
                        <label>Hotel name / Place of stay </label>
                        <input
                            className="border rounded p-2"
                            {...register("location")}
                            defaultValue={result.location}
                        ></input>
                    </section>

                    <section className="flex flex-col gap-2">
                        <label htmlFor="rating">
                            How would you rate your experience?
                        </label>
                        <select
                            {...register("rating")}
                            className="border rounded p-2"
                            defaultValue={result.rating}
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
                            defaultValue={moment(result.dateVisited).format(
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
                            defaultValue={result.comment}
                            rows="3"
                        ></textarea>
                    </section>
                    <button className="w-1/2 m-auto p-2 text-white border rounded bg-blue-500">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    const { id } = context.query;
    await connectMongo();

    let result = {};
    try {
        result = await Review.findById(id).lean();
    } catch (err) {
        console.log(err);
    }

    return {
        props: { result: JSON.parse(JSON.stringify(result)) },
    };
}
