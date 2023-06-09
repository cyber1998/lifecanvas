import React, { Component } from "react";
import { Table, Button } from "reactstrap";
import UserProfileModal from "./profileModal";

class UserList extends Component {
    constructor() {
        super();
        this.state = {isOpen: false};
    }
    openModal = (user_id) => {
        this.setState({isOpen: true});
        return <UserProfileModal isOpen={this.state.isOpen} />;
    }
    render () {
        const users = this.props.users;
        return (
            <Table>
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
                            <td><Button color="primary" onClick={this.openModal}>View User Profile{this.props.buttonLabel}</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        );
    }
}

export default UserList;