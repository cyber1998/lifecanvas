import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'reactstrap';

import { axiosInstance } from '../../constants';
import { BASE_API_URL } from '../../constants';
import ChapterList from '../chapters/ChapterList';

const JournalList = ({ journals }) => {
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    setChapters([]);
  }, []);

  const getChapters = (journalId) => {
    axiosInstance
      .get(BASE_API_URL + `journal/${journalId}/chapter/`)
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
          <Col xs="12" sm="6" md="6" lg="6" xl="6" key={journal.id}>
            <Card className="mb-3" onClick={() => getChapters(journal.id)}>
              <div className="card-body">
                <h5 className="card-title">{journal.title}</h5>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      {chapters.length > 0 && <ChapterList chapters={chapters} />}
    </>
  );
};

export default JournalList;
