import React, { Component, Fragment } from "react";
import { Table, Button } from "reactstrap";
import UserProfileModal from "./UserProfileModal";

class UserList extends Component {

    constructor() {
        super();
        this.state = {
            isOpen: false
        };
    }

    openModal = (user_id) => {
        this.setState({isOpen: true, user_id: user_id});
    }

    toggle = () => {
        this.setState(previous => ({
          isOpen: !previous.isOpen
        }));
      };

    render () {
        const users = this.props.users;
        const isOpen = this.state.isOpen;
        return (
            <Fragment>
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
                            <tr key={user.id} >
                                <td>{user.first_name}</td>
                                <td>{user.last_name}</td>
                                <td>{user.username}</td>
                                <td><Button color="primary" onClick={() => this.openModal(user.id)}>View User Profile{this.props.buttonLabel}</Button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                {isOpen? <UserProfileModal user_id={this.state.user_id} isOpen={isOpen} toggle={this.toggle}/>: null}
            </Fragment>   
        );
    }
}

export default UserList;