import React, { useEffect, useState } from "react";
import {
  AccordionBody,
  AccordionHeader,
  Col,
  Row,
  UncontrolledAccordion,
} from "reactstrap";

import { axiosInstance, BASE_API_URL } from "../../constants";
import ChapterList from "../chapters/ChapterList";

const JournalList = ({ journals }) => {
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    setChapters([]);
  }, []);

  const getChapters = (journalObj) => {
    axiosInstance
      .get(BASE_API_URL + `journal/${journalObj.id}/chapter/`)
      .then((res) => setChapters(res.data.results));
  };

  return (
    <>
      <div className="d-flex flex-column min-h-100 justify-content-center align-items-center mb-3">
        <span className="align-middle">
          <h4>My Journals</h4>
        </span>
      </div>
      <Row>
        {journals.map((journal) => (
          <Col xs="6" sm="6" md="6" lg="12" xl="12" key={journal.id}>
            <UncontrolledAccordion stayOpen="false">
              <AccordionHeader
                onClick={() => getChapters(journal)}
                targetId={journal.id}
              >
                <h5 className="card-title">{journal.title}</h5>
              </AccordionHeader>
              <AccordionBody accordionId={journal.id}>
                <div className="d-flex flex-column min-h-100 justify-content-center align-items-center mb-3">
                  <span className="align-middle">
                    <h4>Chapters</h4>
                  </span>
                </div>
                <Row>
                  {chapters.length > 0 && (
                    <ChapterList
                      chapters={chapters}
                      currentJournalId={journal.id}
                    />
                  )}
                </Row>
              </AccordionBody>
            </UncontrolledAccordion>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default JournalList;
