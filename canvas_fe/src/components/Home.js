import React, {Component} from "react";
import {Col, Container, Row} from "reactstrap";

import UserList from "./users/UserList";

import { axiosInstance } from "../constants";

import { BASE_API_URL } from "../constants";

class Home extends Component {
    state = {
        users: []
    };

    componentDidMount() {
        this.getUsers();
    }

    getUsers = () => {
        axiosInstance.get(BASE_API_URL + "user/").then(res => this.setState({users: res.data.results}));
    };

    render() {
        return (
            <Container style={{marginTop: "20px"}}>
                <Row>
                    <Col>
                        <UserList
                            users={this.state.users}
                        />
                    </Col>
                </Row>
            </Container>
        );
        }
    }

export default Home;