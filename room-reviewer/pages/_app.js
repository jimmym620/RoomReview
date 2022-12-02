// _app.js
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "../components/Layout";
const MyApp = ({ Component, pageProps, auth }) => {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
};
export default MyApp;
