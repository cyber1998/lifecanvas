import React, { useEffect, useState } from "react";
import { CardBody, CardHeader, Col, Row, Card, Container } from "reactstrap";
import { axiosInstance, BASE_API_URL } from "../../constants";

const ManageJournal = () => {
  const [journals, setJournals] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(true);

  useEffect(() => {
    getJournals();
  }, []);

  const handleEditOnClick = () => {
    setIsEditing(true);
  };

  const handleAddOnClick = () => {
    setIsAdding(true);
  };

  const handleEditedData = (e, journal) => {
    setIsEditing((prevIsEditing) => !prevIsEditing);
    const childrenNodes = [...e.target.children];
    const data = childrenNodes.reduce((acc, child) => {
      acc[child.id] = child.innerText
        ? child.innerText
        : journal[child.id];
      return acc;
    }, {});
    axiosInstance.put(BASE_API_URL + `journal/${journal.id}/`, { ...data });
  };
  
  const openAddJournalModal = ({title, description}) => {
    axiosInstance.post(BASE_API_URL + "journal/", {title, description})
    .then((res) => {
      getJournals();
    });
    setIsAdding((prevIsAdding) => !prevIsAdding);
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
              {isAdding ? (
                <Card
                >
                  <CardHeader className="card-title" id="title">
                  Add New Journal
                  </CardHeader>
                  <CardBody
                    id="description"
                    className="d-flex flex-column min-h-100 justify-content-center align-items-center mb-3"
                  >
                    <input type="text" id="title" placeholder="Title" />
                    <input type="text" id="description" placeholder="Description" />
                  </CardBody>
                </Card>
              ) : null}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ManageJournal;
