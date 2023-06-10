import React, {Component} from "react";
import {Col, Container, Row} from "reactstrap";

import JournalList from "./JournalList";

import { axiosInstance } from "../../constants";
import { BASE_API_URL } from "../../constants";

class JournalPage extends Component {
    state = {
        journals: []
    };

    componentDidMount() {
        this.getJournals();
    }

    getJournals = () => {
        axiosInstance.get(BASE_API_URL + "journal/").then(res => this.setState({journals: res.data.results}));
    };

    render() {
        const journals = this.state.journals;
        console.log(journals)
        return (
            <Container style={{marginTop: "20px"}}>
                <Row>
                    <Col>
                    {journals? <JournalList journals={journals}/> : null}
                    </Col>
                </Row>
            </Container>
        );
        }
    }

export default JournalPage;