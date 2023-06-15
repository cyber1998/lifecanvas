// import React, { useState } from "react";
import { Card, Col } from "reactstrap";

const ChapterList = ({ chapters }) => {
//   const [chapterId, setChapterId] = useState(null);

  return (
    <>
      {chapters.map((chapter) => (
        <Col key={chapter.id}>
          <Card className="mb-3">
            <div className="card-body">
              <h5 className="card-title">{chapter.title}</h5>
              <p className="card-text">{chapter.description}</p>
            </div>
          </Card>
        </Col>
      ))}
    </>
  );
};

export default ChapterList;
