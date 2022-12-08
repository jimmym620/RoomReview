import moment from "moment";

export default function Index({ reviews }) {
    return (
        <div>
            <h1>Recently Posted</h1>
            <section className="w-100">
                {reviews.map((review) => {
                    return (
                        <article className="review" key={review._id}>
                            <h2>{review.title}</h2>
                            <p className="rating xl"> {review.rating} / 5</p>
                            <p>{review.comment}</p>
                            <p>Date of visit</p>
                            <p>
                                {moment
                                    .utc(review.dateVisited)
                                    .format("DD/MM/YYYY")}
                            </p>
                            <p>By {review.author}</p>
                        </article>
                    );
                })}
            </section>
        </div>
    );
}

export async function getServerSideProps(context) {
    try {
        const reviews = await fetch(
            "http://localhost:3000/api/reviews/requests"
        ).then((res) => res.json());

        return {
            props: { reviews },
        };
    } catch (error) {
        console.log(error);
    }
}
