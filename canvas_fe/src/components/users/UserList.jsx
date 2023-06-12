import React, { useState } from 'react';
import { Table, Button } from 'reactstrap';
import UserProfileModal from './UserProfileModal';

const UserList = ({ users }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const openModal = (user_id) => {
    setSelectedUserId(user_id);
    setIsOpen(true);
  };

  const toggle = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <>
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
      {isOpen && (
        <UserProfileModal
          user_id={selectedUserId}
          isOpen={isOpen}
          toggle={toggle}
        />
      )}
    </>
  );
};

export default UserList;
