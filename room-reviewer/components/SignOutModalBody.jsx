import Modal from "react-bootstrap/Modal";
import { signOut } from "next-auth/react";

export default function SignOutModalBody({ showStateChanger }) {
    return (
        <>
            <Modal.Header>
                <Modal.Title>Are you sure?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <button
                    className="bg-blue-500 px-3 py-2 rounded text-white"
                    onClick={() => {
                        signOut();
                    }}
                >
                    Yes
                </button>
                <button
                    className="bg-red-500 px-3 py-2 rounded text-white"
                    variant="danger"
                    onClick={() => showStateChanger(false)}
                >
                    No
                </button>
            </Modal.Body>
        </>
    );
}
