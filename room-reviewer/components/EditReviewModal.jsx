import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import moment from "moment";
import { Fragment, useState } from "react";
import { BiX } from "react-icons/bi";

export default function EditReviewModal({ data }) {
    const [isOpen, setIsOpen] = useState(false);
    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }
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
                    new URLSearchParams({ reviewId: data.id }),
                requestOptions
            ).then((response) => {
                if (response.ok) {
                    closeModal();
                    router.push("/dashboard");
                }
            });
        } catch (error) {
            return console.log(error);
        }
    };

    return (
        <div className="w-1/2 md:w-1/3 mx-auto flex justify-center">
            <button
                className="bg-neutral text-primary border border-black py-1 w-full m-auto rounded-md mt-1 hover:bg-tertiary"
                onClick={openModal}
            >
                Edit review
            </button>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-accent p-6 text-left align-middle shadow-xl transition-all">
                                    <div className="flex justify-between">
                                        <Dialog.Title className="text-lg font-medium leading-6 align-center text-gray-900 ">
                                            Edit
                                        </Dialog.Title>
                                        {/* Close Modal Button */}
                                        <button onClick={closeModal}>
                                            <BiX size={"2rem"} />
                                        </button>
                                    </div>
                                    <div className="mt-2">
                                        <form
                                            className="flex flex-col gap-3 "
                                            onSubmit={handleSubmit(onSubmit)}
                                        >
                                            <section className="flex flex-col gap-2">
                                                <label>Title:</label>
                                                <input
                                                    type="hidden"
                                                    defaultValue={data._id}
                                                    {...register("id")}
                                                />
                                                <input
                                                    className="border rounded p-2"
                                                    type="text"
                                                    defaultValue={data.title}
                                                    {...register("title", {
                                                        required:
                                                            "Title is required",
                                                    })}
                                                />
                                            </section>

                                            {errors.title && (
                                                <span className="text-red-500 font-medium">
                                                    This field is required
                                                </span>
                                            )}

                                            <section className="flex flex-col gap-2">
                                                <label>
                                                    Hotel name / Place of stay{" "}
                                                </label>
                                                <input
                                                    className="border rounded p-2"
                                                    {...register("location", {
                                                        required:
                                                            "Title is required",
                                                    })}
                                                    defaultValue={data.location}
                                                ></input>
                                                {errors.location && (
                                                    <span className="text-red-500 font-medium">
                                                        This field is required
                                                    </span>
                                                )}
                                            </section>

                                            <section className="flex flex-col gap-2">
                                                <label htmlFor="rating">
                                                    How would you rate your
                                                    experience?
                                                </label>
                                                <select
                                                    {...register("rating")}
                                                    className="border rounded p-2"
                                                    defaultValue={data.rating}
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
                                                    defaultValue={moment(
                                                        data.dateVisited
                                                    ).format("YYYY-MM-DD")}
                                                />
                                            </section>
                                            <section className="flex flex-col gap-2">
                                                <label>
                                                    Describe your experience{" "}
                                                    <i>(optional)</i>
                                                </label>
                                                <textarea
                                                    className="border rounded p-2"
                                                    {...register("comment")}
                                                    defaultValue={data.comment}
                                                    rows="3"
                                                ></textarea>
                                            </section>
                                            <button
                                                type="submit"
                                                className="w-1/2 m-auto p-2  border rounded bg-neutral text-primary hover:bg-tertiary font-medium"
                                            >
                                                Submit
                                            </button>
                                        </form>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
}
