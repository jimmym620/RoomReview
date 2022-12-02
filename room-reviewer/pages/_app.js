// _app.js

import { SSRProvider } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.scss";
import Layout from "../components/Layout";
const MyApp = ({ Component, pageProps, auth }) => {
    return (
        <SSRProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </SSRProvider>
    );
};
export default MyApp;
