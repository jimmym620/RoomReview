import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
    return (
        <>
            <Navbar />
            <main className="md:w-11/12 m-auto">{children}</main>
            <Footer />
        </>
    );
}
