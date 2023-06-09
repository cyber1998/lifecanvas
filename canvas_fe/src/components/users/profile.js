import React, { Component, Fragment } from "react";

class UserProfile extends Component {
    render () {
        const profile = this.props.profile;
        return (
            <Fragment>
                <div>
                    <h1>{profile.user.first_name} {profile.user.last_name}</h1>
                    <h3>{profile.user.username}</h3>
                    <h3> Interests </h3>
                    {profile.interests?.map((interest) => (
                        <p key={interest.id}>{interest.name}</p>
                    ))};
                </div>
            </Fragment>
        );
    }
}

export default UserProfile;