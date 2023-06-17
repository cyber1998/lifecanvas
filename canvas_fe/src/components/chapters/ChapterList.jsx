// import React, { useState } from "react";
import { Card, Col } from "reactstrap";
import { useState } from "react";
import ChapterDetail from "./ChapterDetail";

const ChapterList = ({ chapters }) => {

  const [currentChapter, setcurrentChapter] = useState(null);

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const openChapterModal = (chapter) => {
    setcurrentChapter(chapter);
    toggle();
  };

  return (
    <>
      {chapters.map((chapter) => (
        <Col key={chapter.id} xs="12" sm="6" md="6" lg="6" xl="6">
          <Card className="mb-3" onClick={() => openChapterModal(chapter)}>
            <div className="card-body" >
              <h5 className="card-title">{chapter.title}</h5>
              <p className="card-text">{chapter.description}</p>
            </div>
          </Card>
        </Col>
      ))}
      {currentChapter? <ChapterDetail chapter={currentChapter} isOpen={isOpen} toggle={toggle}/>: null}
    </>
  );
};

export default ChapterList;
