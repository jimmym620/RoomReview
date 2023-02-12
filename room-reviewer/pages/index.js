import SessionedHomePage from "../components/SessionedHomePage";

import UnsessionedHomePage from "../components/UnsessionedHomePage";
import { BiMenuAltRight, BiMenuAltLeft } from "react-icons/bi";
export default function Index() {
    return (
        <div>
            <h1 className="text-3xl text-center mt-2 flex justify-center gap-2 items-center">
                <BiMenuAltRight />
                Welcome to Room Reviewer
                <BiMenuAltLeft />
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
