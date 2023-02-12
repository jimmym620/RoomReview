import SessionedHomePage from "../components/SessionedHomePage";

import UnsessionedHomePage from "../components/UnsessionedHomePage";
export default function Index() {
    return (
        <div>
            <h1 className="text-3xl text-center mt-2">
                Welcome to Room Reviewer
            </h1>
            <p className="text-center mt-2 w-5/6 md:w-1/4 m-auto">
                Here you can post hotel/experience reviews or read reviews made
                by others. You can login or register by simply signing in with
                your Google account.
            </p>

            {/* {session ? <SessionedHomePage /> : <UnsessionedHomePage />} */}
        </div>
    );
}
