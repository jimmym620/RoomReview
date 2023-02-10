import moment from "moment";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

// import Review from "../../mongoDB/models/reviewModel";

export default function Index({}) {
    const { data: session } = useSession();
    const [results, setResults] = useState([]);
    const [isLoading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };
        fetch("/api/reviews/requests", requestOptions)
            .then((res) => res.json())
            .then((data) => {
                setResults(data);
                setLoading(false);
            });
    }, []);

    if (isLoading) return <p>Loading...</p>;

    return (
        <div>
            <h1 className="text-center text-3xl mb-2">Recently Posted</h1>

            {results && (
                <section className="flex flex-col gap-2 w-11/12 md:w-1/3 m-auto">
                    {results.map((review) => {
                        return (
                            <article
                                className="border rounded-md p-4 text-center"
                                key={review._id}
                            >
                                <h3
                                    className="text-2xl text-center mb-1"
                                    id="title"
                                >
                                    {review.title}
                                </h3>
                                <div className="grid grid-cols-2 m-auto">
                                    <div>
                                        <section>
                                            <p>
                                                <b>By: </b>
                                                {review.author}
                                            </p>

                                            <section>
                                                <p>
                                                    <b>At: </b>
                                                    {review.location}
                                                </p>
                                            </section>

                                            {session ? ( // IF session exists
                                                review.authorID !==
                                                session.user.id ? ( //IF the post author isn't the the current session user
                                                    <div id="upvote-container">
                                                        <button
                                                            className="bg-neutral text-white p-2 rounded-md"
                                                            onClick={() => {
                                                                likePost(
                                                                    review._id,
                                                                    session.user
                                                                        .id
                                                                );
                                                            }}
                                                        >
                                                            {review.upvotedBy.includes(
                                                                session.user.id
                                                            )
                                                                ? "Unlike"
                                                                : "Like"}
                                                        </button>
                                                    </div>
                                                ) : null
                                            ) : null}
                                        </section>
                                    </div>
                                    <div>
                                        <p id="rating">
                                            <b>Rating: </b>
                                            {review.rating} / 5
                                        </p>
                                        <div>
                                            <p>
                                                <b>Visited: </b>
                                                {moment(
                                                    review.dateVisited
                                                ).format("DD/MM/YYYY")}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-sm">
                                    {review.upvotedBy.length} upvotes
                                </p>
                                <hr className="w-2/3 m-auto h-px  my-3 md:my-5 bg-black border-0" />
                                <p className="text-center">{review.comment}</p>
                            </article>
                        );
                    })}
                </section>
            )}

            <p className="text-center">
                Want to add a review? Sign up to start posting
            </p>
        </div>
    );
}

const likePost = async (reviewId, userId) => {
    const requestOptions = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ uid: userId }),
    };

    await fetch("/api/reviews/" + reviewId, requestOptions)
        .then(() => {
            window.location.reload();
        })
        .catch((err) => {
            return console.log(err);
        });
};

// export async function getServerSideProps(context) {
//     const session = await getSession(context);
//     await connectMongo();
//     let results = {};
//     try {
//         results = await Review.find({}).lean();
//     } catch (err) {
//         console.log(err);
//     }

//     return {
//         props: { results: JSON.parse(JSON.stringify(results)), session },
//     };
// }
