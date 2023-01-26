function Footer() {
    return (
        <footer className="fixed bottom-0 left-0 z-20 w-full p-4 bg-emerald-500 border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600">
            <span className="text-sm  sm:text-center dark:text-gray-400">
                © 2023{" "}
                <a
                    href="https://cmjman.netlify.app/"
                    className="hover:underline"
                >
                    jimmym620
                </a>
                . All Rights Reserved.
            </span>
        </footer>
    );
}
export default Footer;
