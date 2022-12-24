// _app.js
import SSRProvider from "react-bootstrap/SSRProvider";
import { SessionProvider } from "next-auth/react";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "../components/Layout";
import "../styles/globals.scss";
import Router from "next/router";
import { useEffect, useState } from "react";

const MyApp = ({ Component, pageProps, session }) => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const start = () => {
            console.log("start");
            setLoading(true);
        };
        const end = () => {
            console.log("finished");
            setLoading(false);
        };
        Router.events.on("routeChangeStart", start);
        Router.events.on("routeChangeComplete", end);
        Router.events.on("routeChangeError", end);
        return () => {
            Router.events.off("routeChangeStart", start);
            Router.events.off("routeChangeComplete", end);
            Router.events.off("routeChangeError", end);
        };
    }, []);
    return (
        <SSRProvider>
            <SessionProvider session={session}>
                <Layout>
                    {loading ? <h1>Loading</h1> : <Component {...pageProps} />}
                </Layout>
            </SessionProvider>
        </SSRProvider>
    );
};
export default MyApp;
