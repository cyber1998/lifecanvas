import React, {Component} from "react";
import {Col, Container, Row} from "reactstrap";

import UserList from "./users/list";

import { axiosInstance } from "../constants";

import { BASE_API_URL } from "../constants";

class Home extends Component {
    state = {
        users: []
    };

    componentDidMount() {
        this.resetState();
    }

    getUsers = () => {
        axiosInstance.get(BASE_API_URL + "user/").then(res => this.setState({users: res.data.results}));
    };

    resetState = () => {
        this.getUsers();
    };

    render() {
        return (
            <Container style={{marginTop: "20px"}}>
                <Row>
                    <Col>
                        <UserList
                            users={this.state.users}
                            resetState={this.resetState}
                        />
                    </Col>
                </Row>
            </Container>
        );
        }
    }

export default Home;