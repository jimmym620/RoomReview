export default function page() {
    return (
        <div>
            <h1>Dashboard</h1>
            <h2>Login or Register</h2>
            <form action="">
                <label htmlFor="username">Username</label>
                <input type="text" name="username" />
                <label htmlFor="email">Email</label>
                <input type="text" name="email" />
                <label htmlFor="password">Password</label>
                <input type="text" name="password" />
            </form>
        </div>
    );
}
