import React, { useState, useEffect } from 'react';
import { Table, Button, Row, Col, Container } from 'reactstrap';
import UserProfile from './Profile';
import { axiosInstance, BASE_API_URL } from '../../constants';


const UserList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null)
  const [users, setUsers] = useState([]);;

  const openModal = (user_id) => {
    setSelectedUserId(user_id);
    setIsOpen(true);
  };

  const toggle = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    axiosInstance
      .get(BASE_API_URL + 'user/')
      .then((res) => setUsers(res.data.results));
  };

  return (
    <>
      <Container style={{ marginTop: '20px' }}>
      <Row>
        <Col>
        <Table striped>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.username}</td>
                <td>
                  <Button
                    color="primary"
                    onClick={() => openModal(user.id)}
                  >
                    View User Profile
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
      </Table>
        </Col>
      </Row>
    </Container>

      {isOpen && (
        <UserProfile
          user_id={selectedUserId}
          isOpen={isOpen}
          toggle={toggle}
        />
      )}
    </>
  );
};

export default UserList;
