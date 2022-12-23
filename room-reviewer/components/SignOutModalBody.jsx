import { Button, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { signOut } from "next-auth/react";

export default function SignOutModalBody({ showStateChanger }) {
    return (
        <>
            <Modal.Header>
                <Modal.Title>Are you sure?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Button
                    onClick={() => {
                        signOut();
                    }}
                >
                    Yes
                </Button>
                <Button
                    variant="danger"
                    onClick={() => showStateChanger(false)}
                >
                    No
                </Button>
            </Modal.Body>
        </>
    );
}
