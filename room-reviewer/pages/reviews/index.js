import moment from "moment";

export default function Index({ reviews }) {
    return (
        <div>
            <h1>Recently Posted</h1>
            <section>
                {reviews.map((review) => {
                    return (
                        <article className="review" key={review._id}>
                            <h3 id="title">{review.title}</h3>
                            <section>
                                <p>
                                    By <b>{review.author}</b>
                                </p>
                                <p id="rating"> {review.rating} / 5 stars</p>
                            </section>
                            <p id="comment">{review.comment}</p>

                            <section>
                                <div>
                                    <p>Date of visit:</p>
                                    <b>
                                        {moment
                                            .utc(review.dateVisited)
                                            .format("DD/MM/YYYY")}
                                    </b>
                                </div>
                                <div>
                                    <p>At:</p>
                                    <b>{review.location}</b>
                                </div>
                            </section>
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
