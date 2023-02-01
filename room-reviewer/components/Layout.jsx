import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
    return (
        <main className="flex flex-col min-h-screen ">
            <Navbar />
            <section className="m-2 md:m-6 flex-grow">{children}</section>
            <Footer />
        </main>
    );
}
