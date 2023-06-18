import { CardTitle, Card, Button, CardText, Badge, List, ListInlineItem, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { useState } from 'react';
import { axiosInstance, BASE_API_URL } from '../../constants';

const UserProfile = ({ user_id, isOpen, toggle }) => {

  const [profile, setProfile] = useState(null);

  const closeModal = () => {
    toggle();
  };
  
  const getUserProfile = (user_id) => {
    axiosInstance
      .get(BASE_API_URL + `user/${user_id}/profile/`)
      .then((res) => setProfile(res.data));
  };

  if (profile !== null) {
    const fullName = profile.user.first_name + ' ' + profile.user.last_name;
    return (
      <>
      <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader>User Profile</ModalHeader>
      <ModalBody>
        <Card body>
          <CardTitle>{fullName}</CardTitle>
          <CardText>Username: {profile.user.username}</CardText>
          <List type="inline">
            {profile.interests.map((interest) => (
              <ListInlineItem key={interest.id}>
                <Badge color="dark" pill className="p-2">
                  {interest.name}
                </Badge>
              </ListInlineItem>
            ))}
          </List>
          <Button color="dark" outline onClick={closeModal}>
            Close
          </Button>
        </Card>
      </ModalBody>
      </Modal>
      </>
    );
  } else {
    getUserProfile(user_id);
    return null;
  }
};

export default UserProfile;
