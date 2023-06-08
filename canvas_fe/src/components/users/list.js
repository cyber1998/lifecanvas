import React, { Component } from "react";
import { Table } from "reactstrap";

class UserList extends Component {
    render () {
        const users = this.props.users;
        return (
            <Table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.username}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        );
    }
}

export default UserList;