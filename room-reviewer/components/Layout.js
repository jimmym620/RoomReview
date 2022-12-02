import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
    return (
        <>
            <Navbar />
            <main className="m-4">{children}</main>
            <Footer />
        </>
    );
}
