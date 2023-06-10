import React, { Component, Fragment } from "react";
import { Card, Col, Row } from "reactstrap";

import { axiosInstance } from "../../constants";
import { BASE_API_URL } from "../../constants";
import ChapterList from "../chapters/ChapterList";

class JournalList extends Component {

    constructor() {
        super();
        this.state = {
            chapters: []
        };
    }

    getChapters = (journalId) => {
        axiosInstance.get(BASE_API_URL + `journal/${journalId}/chapter/`).then(res => this.setState({chapters: res.data.results}));
    };

    render () {
        const journals = this.props.journals;
        const chapters = this.state.chapters;
        return (
            <Fragment>
                <div class="d-flex flex-column min-h-100 justify-content-center align-items-center mb-3">
                    <span class="align-middle">
                        <h4> My Journals </h4>
                    </span>
                </div>
                <Row>
                {journals.map((journal) => (
                    <Col xs="12" sm="6" md="6" lg="6" xl="6" key={journal.id}>
                        <Card className="mb-3" onClick={() => this.getChapters(journal.id)}>
                            <div className="card-body">
                                <h5 className="card-title">{journal.title}</h5>
                            </div>
                        </Card>
                    </Col>
                    ))}
                </Row>
            {chapters? <ChapterList chapters={chapters}/> : null}
            </Fragment> 
        );
    }
}

export default JournalList;
