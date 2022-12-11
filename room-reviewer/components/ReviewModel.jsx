import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ReviewModal({ close }) {
    return (
        <>
            <Modal.Header>
                <Modal.Title>Edit review</Modal.Title>
            </Modal.Header>
            <Modal.Body>This is the body of the modal form</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={close}>
                    Close
                </Button>
                <Button
                    variant="primary"
                    onClick={() => {
                        close();
                        //SUBMIT PATCH REQUEST
                    }}
                >
                    Save Changes
                </Button>
            </Modal.Footer>
        </>
    );
}

export default ReviewModal;
