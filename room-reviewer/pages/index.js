import SessionedHomePage from "../components/SessionedHomePage";

import UnsessionedHomePage from "../components/UnsessionedHomePage";
export default function Index() {
    return (
        <div>
            <h1 className="text-3xl text-center mt-2">Welcome</h1>

            {/* {session ? <SessionedHomePage /> : <UnsessionedHomePage />} */}
        </div>
    );
}
