import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

export default function ReviewSubmitForm() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { data: session } = useSession();

    const onSubmit = async (data) => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };
        await fetch("/api/reviews/requests", requestOptions)
            .then((response) => {
                if (response.ok) {
                    router.push({ pathname: "/dashboard" });
                }
            })
            .catch((err) => {
                console.log(err);
            });
        return;
    };

    // console.log(watch("Title"));
    return (
        <div>
            <h1 className="text-2xl text-center">Add Review</h1>
            <form
                className="flex flex-col gap-3 md:w-1/3 m-auto"
                onSubmit={handleSubmit(onSubmit)}
            >
                <section className="flex flex-col gap-1">
                    <label>Title:</label>

                    <input
                        className="border rounded p-2"
                        type="text"
                        {...register("title", {
                            required: "Title is required",
                        })}
                    />
                    {errors.title && (
                        <span className="text-red-500 font-medium">
                            This field is required
                        </span>
                    )}
                </section>

                <section className="flex flex-col gap-1">
                    <label>Hotel name / Place of stay </label>
                    <input
                        className="border rounded p-2"
                        {...register("location", {
                            required: "Title is required",
                        })}
                    ></input>
                    {errors.location && (
                        <span className="text-red-500 font-medium">
                            This field is required
                        </span>
                    )}
                </section>

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

                <section className="flex flex-col gap-1">
                    <label htmlFor="rating">
                        How would you rate your experience?
                    </label>
                    <select
                        {...register("rating")}
                        className="border rounded p-2"
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </section>

                <section className="inline-block align-middle">
                    <label className="mr-4">Date of visit:</label>
                    <input
                        className="border rounded p-2"
                        {...register("dateVisited")}
                        type="date"
                        defaultValue={"2022-01-01"}
                    />
                </section>
                {errors.dateVisited && (
                    <span className="text-red-500 font-medium">
                        This field is required
                    </span>
                )}

                <section className="flex flex-col gap-2">
                    <label>
                        Describe your experience <i>(optional)</i>
                    </label>
                    <textarea
                        className="border rounded p-2"
                        {...register("comment")}
                        rows="3"
                    ></textarea>
                </section>

                <button
                    type="submit"
                    className="w-1/2 m-auto p-2 border border-black rounded-lg bg-neutral text-primary hover:bg-tertiary"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
