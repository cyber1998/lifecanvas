import React, { Component, Fragment } from "react";
import { Card, Col } from "reactstrap";



class ChapterList extends Component {

    constructor() {
        super();
        this.state = {
            chapterId: null
        };
    }

    setChapterId = (chapterId) => {
        this.setState({chapterId: chapterId});
    }

    render () {
        const chapters = this.props.chapters;
        return (
            <Fragment>
                {chapters.map((chapter) => (
                    <Col key={chapter.id}>
                        <Card className="mb-3">
                            <div className="card-body">
                                <h5 className="card-title">{chapter.title}</h5>
                                <p className="card-text">{chapter.description}</p>
                            </div>
                        </Card>
                    </Col>
                    ))}
            </Fragment>   
        );
    }
}

export default ChapterList;
