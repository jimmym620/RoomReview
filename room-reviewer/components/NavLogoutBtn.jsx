export default function NavLogoutBtn({ setModalOpen }) {
    return (
        <>
            <button
                className="block text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={setModalOpen(true)}
            >
                Logout
            </button>
        </>
    );
}
