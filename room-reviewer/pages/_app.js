// _app.js
import SSRProvider from "react-bootstrap/SSRProvider";
import { SessionProvider } from "next-auth/react";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "../components/Layout";
import "../styles/globals.scss";
import Router from "next/router";
import { useEffect } from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const MyApp = ({ Component, pageProps, session }) => {
    useEffect(() => {
        Router.events.on("routeChangeStart", NProgress.start());
        Router.events.on("routeChangeComplete", NProgress.done());
        Router.events.on("routeChangeError", NProgress.done());
        return () => {
            Router.events.off("routeChangeStart", NProgress.start());
            Router.events.off("routeChangeComplete", NProgress.done());
            Router.events.off("routeChangeError", NProgress.done());
        };
    }, []);
    return (
        <SSRProvider>
            <SessionProvider session={session}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </SessionProvider>
        </SSRProvider>
    );
};
export default MyApp;
