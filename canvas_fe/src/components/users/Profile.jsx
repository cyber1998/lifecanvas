import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { useState, useEffect } from "react";
import { axiosInstance, BASE_API_URL } from "../../constants";

const UserProfile = ({ userId, isOpen, closeProfile }) => {
  const [profile, setProfile] = useState(null);
  const [interests, setInterests] = useState([]);

  useEffect(() => {
    // Get the user profile
    axiosInstance.get(BASE_API_URL + `user/${userId}/profile/`).then((res) => {
      setProfile({
        interests: res.data.interests.map((interest) => interest.id),
        ...res.data.user,
      });
    });

    // Get interests
    axiosInstance.get(BASE_API_URL + `interests/`).then((res) => {
      setInterests(res.data);
    });
  }, [userId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      first_name: event.target.first_name.value,
      last_name: event.target.last_name.value,
      email: event.target.email.value,
      interests: [...event.target.interests.selectedOptions].map((opt) =>
        parseInt(opt.value)
      ),
    };
    axiosInstance
      .put(BASE_API_URL + `user/${userId}/update-profile/`, data)
      .then((res) => {
        closeProfile();
      })
      .catch((err) => console.log(err));
  };

  const handleProfileChange = (id, value) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      [id]: value,
    }));
  };
  console.log(profile?.interests);
  return (
    <div>
      <Modal isOpen={isOpen} toggle={closeProfile}>
        <ModalHeader>My Profile</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="first_name">First Name:</Label>
              <Input
                type="text"
                id="first_name"
                placeholder="Enter your name"
                value={profile?.first_name}
                onChange={(e) =>
                  handleProfileChange(e.target.id, e.target.value)
                }
              />
              <Label for="last_name">Last Name:</Label>
              <Input
                type="text"
                id="last_name"
                placeholder="Enter your last name"
                value={profile?.last_name}
                onChange={(e) =>
                  handleProfileChange(e.target.id, e.target.value)
                }
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email:</Label>
              <Input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={profile?.email}
                onChange={(e) =>
                  handleProfileChange(e.target.id, e.target.value)
                }
              />
            </FormGroup>
            <FormGroup>
              <Label for="interests">Interests:</Label>
              <Input
                type="select"
                name="interests"
                id="interests"
                multiple
                onChange={(e) => {
                  let value = e.target.value;
                  let exists = profile?.interests.includes(value);
                  let finalList = exists
                    ? profile?.interests.filter(
                        (interest) => interest !== value
                      )
                    : [...profile?.interests, parseInt(value)];
                  handleProfileChange(e.target.id, finalList);
                }}
              >
                {interests.map((interest) => (
                  <option
                    key={interest.id}
                    value={interest.id}
                    selected={profile?.interests?.includes(interest.id)}
                  >
                    {interest.name}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <Button type="submit">Submit</Button>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={closeProfile}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default UserProfile;
