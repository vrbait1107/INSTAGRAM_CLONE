import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const Home = () => {
  return (
    <Container>
      <Row>
        <Col className="my-4" md={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Header>
              <h5>
                <img
                  src="https://raw.githubusercontent.com/vrbait1107/vrbait1107.github.io/master/images/Vishal%20Bait.jpg"
                  className="img-fluid mr-4 rounded-circle"
                  alt="Profile Image"
                  style={{ maxHeight: 50 }}
                />
                vrbait1107
              </h5>
            </Card.Header>

            <Card.Body>
              <img
                src="https://images.pexels.com/photos/1909572/pexels-photo-1909572.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                alt="My Gallery"
                className="img-fluid w-100"
              />
            </Card.Body>

            <div className="ml-3 mb-3">
              <h6>This is Title</h6>
              <p>This is description</p>

              <a href="#">View All Comments</a>
            </div>

            <input
              type="text"
              className="form-control"
              placeholder="Add Comment"
            />
          </Card>
        </Col>

        <Col className="my-4" md={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Header>
              <h5>
                <img
                  src="https://raw.githubusercontent.com/vrbait1107/vrbait1107.github.io/master/images/Vishal%20Bait.jpg"
                  className="img-fluid mr-4 rounded-circle"
                  alt="Profile Image"
                  style={{ maxHeight: 50 }}
                />
                vrbait1107
              </h5>
            </Card.Header>

            <Card.Body>
              <img
                src="https://images.pexels.com/photos/1909572/pexels-photo-1909572.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                alt="My Gallery"
                className="img-fluid"
              />
            </Card.Body>

            <div className="ml-3 mb-3">
              <h6>This is Title</h6>
              <p>This is description</p>

              <a href="#">View All Comments</a>
            </div>

            <input
              type="text"
              className="form-control"
              placeholder="Add Comment"
            />
          </Card>
        </Col>

        <Col className="my-4" md={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Header>
              <h5>
                <img
                  src="https://raw.githubusercontent.com/vrbait1107/vrbait1107.github.io/master/images/Vishal%20Bait.jpg"
                  className="img-fluid mr-4 rounded-circle"
                  alt="Profile Image"
                  style={{ maxHeight: 50 }}
                />
                vrbait1107
              </h5>
            </Card.Header>

            <Card.Body>
              <img
                src="https://images.pexels.com/photos/1909572/pexels-photo-1909572.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                alt="My Gallery"
                className="img-fluid"
              />
            </Card.Body>
            <div className="ml-3 mb-3">
              <h6>This is Title</h6>
              <p>This is description</p>

              <a href="#">View All Comments</a>
            </div>

            <input
              type="text"
              className="form-control"
              placeholder="Add Comment"
            />
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
