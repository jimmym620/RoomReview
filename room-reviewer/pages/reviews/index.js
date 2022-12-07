import axios from "axios";

export default function Reviews(props) {
    return (
        <div>
            <h1>Recently Posted</h1>
            {console.log(props.reviews)}
        </div>
    );
}

export async function getServerSideProps(context) {
    try {
        // get all reviews
        const reviews = await axios.get(
            "http://localhost:3000/api/reviews/requests"
        ).data;

        return {
            props: { reviews },
            redirect: {
                permanent: false,
                destination: "/",
            },
        };
    } catch (error) {
        console.log(error);
    }
}
