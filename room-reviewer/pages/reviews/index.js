export default function Index({ reviews }) {
    return (
        <div>
            <h1>Recently Posted</h1>
            <section>
                {reviews.map((review) => {
                    return (
                        <article className="review w-25" key={review._id}>
                            <h2>{review.title}</h2>
                            <p className="rating xl"> {review.rating} / 5</p>
                            <p>{review.comment}</p>
                            <p>Date of visit</p>
                            <p>{review.dateVisited}</p>
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
