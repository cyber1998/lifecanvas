import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'reactstrap';

import JournalList from './JournalList';

import { axiosInstance } from '../../constants';
import { BASE_API_URL } from '../../constants';

const JournalPage = () => {
  const [journals, setJournals] = useState([]);

  useEffect(() => {
    getJournals();
  }, []);

  const getJournals = () => {
    axiosInstance
      .get(BASE_API_URL + 'journal/')
      .then((res) => setJournals(res.data.results));
  };

  return (
    <Container style={{ marginTop: '20px' }}>
      <Row>
        <Col>
          {journals.length > 0 && <JournalList journals={journals} />}
        </Col>
      </Row>
    </Container>
  );
};

export default JournalPage;
