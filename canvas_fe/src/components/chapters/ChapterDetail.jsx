import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { axiosInstance, BASE_API_URL } from '../../constants';

const ChapterDetail = ({ isOpen, toggle, currentChapter, currentJournalId, setCurrentChapter}) => {

    const getChapter = (chapter_id) => {
        axiosInstance
          .get(BASE_API_URL + `journal/${currentJournalId}/chapter/${chapter_id}/`)
          .then((res) => setChapter(res.data));
    };

    const setChapter = (chapter) => {
        setCurrentChapter(chapter);
    };

    console.log(currentChapter);
    
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
            <ModalFooter>
                <div className="d-flex flex-column min-h-100 justify-content-center align-items-center mb-3">
                    <span className="align-left">
                        <Button color="primary" onClick={() => getChapter(currentChapter.previous_chapter)} disabled={currentChapter.previous_chapter === null}>
                            Previous
                        </Button>
                    </span>
                    <span className="align-right">
                        <Button color="primary" onClick={() => getChapter(currentChapter.next_chapter)} disabled={currentChapter.next_chapter === null}>
                            Next
                        </Button>
                    </span>
                </div>
            </ModalFooter>
        </Modal>
        </>
    );
};

export default ChapterDetail;