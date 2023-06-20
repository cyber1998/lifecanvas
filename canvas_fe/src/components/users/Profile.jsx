import { Form, FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useState, useEffect } from 'react';
import { axiosInstance, BASE_API_URL } from '../../constants';

const UserProfile = ({ user }) => {
  const [profile, setProfile] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [interests, setInterests] = useState([]);


  const toggle = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const closeModal = () => {
    toggle();
  };

  const userId = user.user_id;
  
  const getUserProfile = (userId) => {
    axiosInstance
      .get(BASE_API_URL + `user/${userId}/profile/`)
      .then((res) => setProfile(res.data));
  };

  useEffect(() => {
    getUserProfile(userId);
    if (profile) {
      setFirstName(profile.first_name);
      setLastName(profile.last_name);
      setEmail(profile.email);
      setInterests(profile.interests);
    }
  }, []);


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      interests: interests,
    };
    axiosInstance
      .put(BASE_API_URL + `user/${userId}/profile/`, data)
      .then((res) => {
        closeModal();
      })
      .catch((err) => console.log(err));
  };

  console.log(firstName);

  return (
    <div>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>User Profile</ModalHeader>
        <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="firstName">First Name:</Label>
            <Input
              type="text"
              id="firstName"
              placeholder="Enter your name"
              defaultValue={firstName}
              onChange={event => setFirstName(event.target.value)}
            />
            <Label for="lastName">Last Name:</Label>
            <Input
              type="text"
              id="lastName"
              placeholder="Enter your last name"
              defaultValue={lastName}
              onChange={event => setLastName(event.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email:</Label>
            <Input
              type="email"
              id="email"
              placeholder="Enter your email"
              defaultValue={email}
              onChange={event => setEmail(event.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="interests">Interests:</Label>
            <Input
              type="text"
              id="interests"
              placeholder="Enter your interests"
              defaultValue={interests}
              onChange={event => setInterests(event.target.value)}
            />
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
