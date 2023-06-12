import React, { useEffect, useState } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import UserProfile from './Profile';
import { axiosInstance } from '../../constants';
import { BASE_API_URL } from '../../constants';

const UserProfileModal = ({ isOpen, toggle, user_id }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getUserProfile(user_id);
  }, [user_id]);

  const getUserProfile = (user_id) => {
    axiosInstance
      .get(BASE_API_URL + `user/${user_id}/profile/`)
      .then((res) => setProfile(res.data));
  };

  return (
    <>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader>User Profile</ModalHeader>
        <ModalBody>
          {profile ? (
            <UserProfile profile={profile} toggle={toggle} />
          ) : null}
        </ModalBody>
      </Modal>
    </>
  );
};

export default UserProfileModal;
