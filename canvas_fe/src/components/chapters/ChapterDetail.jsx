import { Modal, ModalHeader, ModalBody } from 'reactstrap';

const ChapterDetail = ({ isOpen, toggle, currentChapter }) => {

    return (
        <>
        <Modal isOpen={isOpen} toggle={toggle} className="modal-lg">
            <ModalHeader>
                <div className="d-flex flex-column min-h-100 justify-content-center align-items-center mb-3">
                    <span className="align-middle">
                    <h4>{currentChapter.title}</h4>
                    </span>
                </div>
                <div className="d-flex flex-column min-h-100 justify-content-center align-items-center mb-3">
                    <span className="align-middle">
                    <h5>{currentChapter.description}</h5>
                    </span>
                </div>
            </ModalHeader>
            <ModalBody>
                <div className="d-flex flex-column min-h-100 justify-content-center align-items-center mb-3">
                    <span className="align-middle">
                    <p>{currentChapter.body}</p>
                    </span>
                </div>
            </ModalBody>
        </Modal>
        </>
    );
};

export default ChapterDetail;