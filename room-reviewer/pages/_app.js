// _app.js
import SSRProvider from "react-bootstrap/SSRProvider";
import { SessionProvider } from "next-auth/react";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "../components/Layout";
import "../styles/globals.scss";

const MyApp = ({ Component, pageProps, session }) => {
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
