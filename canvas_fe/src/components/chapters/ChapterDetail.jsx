import { Modal, ModalHeader, ModalBody } from 'reactstrap';

const ChapterDetail = ({ isOpen, toggle, chapter }) => {

    return (
        <>
        <Modal isOpen={isOpen} toggle={toggle} className="modal-lg">
            <ModalHeader>
                <div className="d-flex flex-column min-h-100 justify-content-center align-items-center mb-3">
                    <span className="align-middle">
                    <h4>{chapter.title}</h4>
                    </span>
                </div>
                <div className="d-flex flex-column min-h-100 justify-content-center align-items-center mb-3">
                    <span className="align-middle">
                    <h5>{chapter.description}</h5>
                    </span>
                </div>
            </ModalHeader>
            <ModalBody>
                <div className="d-flex flex-column min-h-100 justify-content-center align-items-center mb-3">
                    <span className="align-middle">
                    <p>{chapter.body}</p>
                    </span>
                </div>
            </ModalBody>
        </Modal>
        </>
    );
};

export default ChapterDetail;