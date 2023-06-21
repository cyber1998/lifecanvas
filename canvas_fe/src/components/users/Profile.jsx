import { Form, FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useState, useEffect } from 'react';
import { axiosInstance, BASE_API_URL } from '../../constants';

const UserProfile = ({ userId }) => {
  const [profile, setProfile] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const [interests, setInterests] = useState([]);

  useEffect(() => {

    // Get the user profile
    axiosInstance
      .get(BASE_API_URL + `user/${userId}/profile/`)
      .then((res) => {
        setProfile(res.data);
      });
      
      // Get interests
      axiosInstance
      .get(BASE_API_URL + `interests/`)
      .then((res) => {
        setInterests(res.data);
      });

  }, [userId]);

  const toggle = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const closeModal = () => {
    toggle();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      first_name: event.target.firstName.value,
      last_name: event.target.lastName.value,
      email: event.target.email.value,
      interests: [...event.target.interests.selectedOptions].map(opt => parseInt(opt.value))
    };
    axiosInstance
      .put(BASE_API_URL + `user/${userId}/update-profile/`, data)
      .then((res) => {
        closeModal();
      })
      .catch((err) => console.log(err));
  };
 
  const selectedInterests = profile?.interests.map((interest) => interest.id);

  return (
    <div>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>My Profile</ModalHeader>
        <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="firstName">First Name:</Label>
            <Input
              type="text"
              id="firstName"
              placeholder="Enter your name"
              defaultValue={profile?.user.first_name}
            />
            <Label for="lastName">Last Name:</Label>
            <Input
              type="text"
              id="lastName"
              placeholder="Enter your last name"
              defaultValue={profile?.user.last_name}
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email:</Label>
            <Input
              type="email"
              id="email"
              placeholder="Enter your email"
              defaultValue={profile?.user.email}
            />
          </FormGroup>
          <FormGroup>
            <Label for="interests">Interests:</Label>
            <Input type="select" name="interests" id="interests" multiple>
              {interests.map((interest) => (
                <option key={interest.id} value={interest.id} selected={selectedInterests?.includes(interest.id)}>
                  {interest.name}
                </option>
              ))}
            </Input>
          </FormGroup>
          <Button type="submit">Submit</Button>
        </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={closeModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default UserProfile;
