import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ReviewModal({ close, title, location, rating, dataVisited, comment }) {
    return (
        <>
            <Modal.Header>
                <Modal.Title>Edit {title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{comment}</p>
            </Modal.Body>
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
