import React, {Component} from "react";
// import {Card, CardText} from "reactstrap";

class Home extends Component {
    state = {
    };

    componentDidMount() {

    }

    getUsers = () => {

    };

    render() {
        return (
            <div id="main-container">
                <div class="d-flex flex-column min-vh-100 justify-content-center align-items-center" id="welcome-element">
                    <span class="align-middle">
                        <h2> Welcome to Lifecanvas, Cyber </h2>
                    </span>
                    <span class="align-middle">
                        <p> Start writing your journal here! </p>
                    </span>
                </div>
            </div>
        );
        }
    }

export default Home;