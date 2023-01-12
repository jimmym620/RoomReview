import SessionedHomePage from "../components/SessionedHomePage";

import { useSession } from "next-auth/react";
import UnsessionedHomePage from "../components/UnsessionedHomePage";
export default function Index() {
    const { data: session } = useSession();

    return (
        <div className="homepage-container">
            <h1>Welcome</h1>

            {session ? <SessionedHomePage /> : <UnsessionedHomePage />}
        </div>
    );
}

// export async function getServerSideProps(context) {
//     try {
//         // get all reviews
//         const response = await axios.get(
//             "http://localhost:3000/api/user/requests"
//         );
//         const user = response.data;

//         return {
//             props: { user },
//         };
//     } catch (error) {
//         console.log(error);
//     }
// }
