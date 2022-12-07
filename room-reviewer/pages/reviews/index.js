export default function Index({ reviews }) {
    return (
        <div>
            <h1>Recently Posted</h1>
            {reviews.map((review) => {
                return <p>{review.title}</p>;
            })}
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
