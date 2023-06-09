import React, { Component, Fragment } from "react";
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import UserProfile from "./profile";
import { axiosInstance } from "../../constants";
import { BASE_API_URL } from "../../constants";



class UserProfileModal extends Component {
    state = {
        user_id: 0,
        isOpen: false
    };

    toggle = () => {
        this.setState(previous => ({
            isOpen: !previous.isOpen
        }));
    };

    componentDidMount() {
        this.resetState();
    }

    getUserProfile = (user_id) => {
        axiosInstance.get(BASE_API_URL + `user/${user_id}/profile/`).then(res => this.setState({profile: res.data}));
    };

    resetState = () => {
        this.getUserProfile(this.props.user_id);
    };

    render () {
        const profile = this.props.profile;
        return (
            <Fragment>
                <Modal isOpen={this.state.isOpen} toggle={this.toggle}>
                    <ModalHeader>
                        User Profile
                    </ModalHeader>
                    <ModalBody>
                        <UserProfile profile={profile}/>
                    </ModalBody>
                </Modal>
            </Fragment>
            
        )
    }
};

export default UserProfileModal;