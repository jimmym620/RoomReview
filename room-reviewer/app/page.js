import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default async function Home() {
    // const users = await fetchUsers();
    return (
        <div>
            <h1>Home page</h1>
            <h2>Latest Reviews</h2>

            {users.map((each) => {
                return <p>{each.email}</p>;
            })}

            {/* <h2>Most Helpful Reviews</h2> */}
        </div>
    );
}

async function fetchUsers() {
    const userResponse = await fetch("http://localhost:3000/api/test/get");

    return userResponse.json();
}
