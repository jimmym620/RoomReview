import Button from "react-bootstrap/Button";
import axios from "axios";

export default function SessionedHomePage({ userData }) {
    return (
        <div>
            <p>You are logged in</p>
            <p>{userData.name}</p>
        </div>
    );
}
