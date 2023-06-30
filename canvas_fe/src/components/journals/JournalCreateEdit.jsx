import React, { useEffect, useState } from "react";
import {
  CardBody,
  CardHeader,
  Col,
  Row,
  Card,
  Container,
  Input,
  Label,
  Form,
  Button,
} from "reactstrap";
import { axiosInstance, BASE_API_URL } from "../../constants";

const ManageJournal = () => {
  const [journals, setJournals] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    getJournals();
  }, []);

  const handleEditOnClick = () => {
    setIsEditing(true);
  };

  const handleEditedData = (e, journal) => {
    setIsEditing((prevIsEditing) => !prevIsEditing);
    const childrenNodes = [...e.target.children];
    const data = childrenNodes.reduce((acc, child) => {
      acc[child.id] = child.innerText ? child.innerText : journal[child.id];
      return acc;
    }, {});
    axiosInstance.put(BASE_API_URL + `journal/${journal.id}/`, { ...data });
  };

  const openAddJournalModal = (e) => {
    const title = e.target.title.value;
    const description = e.target.description.value;
    axiosInstance
      .post(BASE_API_URL + "journal/", { title, description })
      .then((res) => {
        getJournals();
      });
  };

  const getJournals = () => {
    axiosInstance
      .get(BASE_API_URL + "journal/")
      .then((res) => setJournals(res.data.results));
  };
  return (
    <>
      <Container style={{ marginTop: "20px" }}>
        <Row>
          <Col>
            <div className="d-flex flex-column min-h-100 justify-content-center align-items-center mb-3">
              <span className="align-middle">
                <h4>Manage</h4>
              </span>
            </div>
            <Row>
              {journals.map((journal) => (
                <Col
                  xs="6"
                  sm="6"
                  md="6"
                  lg="12"
                  xl="12"
                  key={journal.id}
                  className="mb-3"
                >
                  {isEditing ? (
                    <Card
                      contentEditable="true"
                      onBlur={(e) => handleEditedData(e, journal)}
                    >
                      <CardHeader className="card-title" id="title">
                        {journal.title}
                      </CardHeader>
                      <CardBody
                        id="description"
                        className="d-flex flex-column min-h-100 justify-content-center align-items-center mb-3"
                      >
                        {journal.description}
                      </CardBody>
                    </Card>
                  ) : (
                    <Card>
                      <CardHeader
                        className="card-title"
                        onClick={handleEditOnClick}
                        id="title"
                      >
                        {journal.title}
                      </CardHeader>
                      <CardBody
                        id="description"
                        onClick={handleEditOnClick}
                        className="d-flex flex-column min-h-100 justify-content-center align-items-center mb-3"
                      >
                        {journal.description}
                      </CardBody>
                    </Card>
                  )}
                </Col>
              ))}
            </Row>
            <Row>
              <Form onSubmit={(e) => openAddJournalModal(e)}>
                <Card>
                  <CardHeader className="card-title" id="title">
                    <h4>Add New Journal</h4>
                  </CardHeader>
                  <CardBody
                    id="description"
                    className="d-flex flex-column min-h-100 mb-3"
                  >
                    <div className="mb-3">
                      <Label for="title"> <h5>Journal Title</h5></Label>
                      <Input
                      type="text"
                      id="title"
                      placeholder="New Journal Title"
                    ></Input>
                    </div>
                    <div className="mb-3">
                      <Label for="description"> <h5>Journal Description</h5></Label>
                      <Input
                      type="textarea"
                      id="description"
                      placeholder="New Journal Description"
                    ></Input>
                    </div>
                    <div>
                    <Button
                      type="submit"
                      className="d-flex flex-column min-v-100"
                    >
                      Add Journal
                    </Button>
                    </div>
                  </CardBody>
                </Card>
              </Form>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ManageJournal;
