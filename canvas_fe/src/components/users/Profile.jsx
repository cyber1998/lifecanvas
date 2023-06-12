import React from 'react';
import { CardTitle, Card, Button, CardText, Badge, List, ListInlineItem } from 'reactstrap';

const UserProfile = ({ profile, toggle }) => {
  const closeModal = () => {
    toggle();
  };

  const fullName = profile.user.first_name + ' ' + profile.user.last_name;

  return (
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
  );
};

export default UserProfile;
