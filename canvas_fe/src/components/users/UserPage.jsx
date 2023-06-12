import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'reactstrap';

import UserList from './UserList';

import { axiosInstance } from '../../constants';
import { BASE_API_URL } from '../../constants';

const UserPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    axiosInstance
      .get(BASE_API_URL + 'user/')
      .then((res) => setUsers(res.data.results));
  };

  return (
    <Container style={{ marginTop: '20px' }}>
      <Row>
        <Col>
          <UserList users={users} />
        </Col>
      </Row>
    </Container>
  );
};

export default UserPage;
