import React, { Component, Fragment } from "react";
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import UserProfile from "./Profile";
import { axiosInstance } from "../../constants";
import { BASE_API_URL } from "../../constants";



class UserProfileModal extends Component {
    state = {
        profile: null,
    };

    componentDidMount() {
        this.getUserProfile(this.props.user_id);
    }

    getUserProfile = (user_id) => {
        axiosInstance.get(BASE_API_URL + `user/${user_id}/profile/`).then(res => this.setState({profile: res.data}));
    };

    render () {
        const profile = this.state.profile;
        return (
            <Fragment>
                <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
                    <ModalHeader>
                        User Profile
                    </ModalHeader>
                    <ModalBody>
                        {profile? <UserProfile profile={this.state.profile} toggle={this.props.toggle}/> : null}
                    </ModalBody>
                </Modal>
            </Fragment>
            
        )
    }
};

export default UserProfileModal;