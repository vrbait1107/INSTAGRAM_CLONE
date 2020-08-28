import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const Profile = () => {
  return (
    <Container className="mt-5">
      <Row>
        <Col md={{ span: 3, offset: 2 }}>
          <img
            src="https://raw.githubusercontent.com/vrbait1107/vrbait1107.github.io/master/images/Vishal%20Bait.jpg"
            className="img-fluid rounded-circle"
            alt="Profile Image"
            style={{ maxHeight: 200 }}
          />
        </Col>
        <Col md={5}>
          <div>
            <h3>
              vrbait1107
              <Button className="mx-3" variant="primary">
                Follow
              </Button>
            </h3>
          </div>

          <div className="mt-3">
            <h6>
              <span className="mr-3">1 Post</span>
              <span className="mx-3">285 Followers</span>
              <span className="mx-3">300 Following</span>
            </h6>
          </div>

          <div className="mt-3">
            <h5>Vishal Bait</h5>
            <h6>Web & Mobile App Developer</h6>
          </div>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col md={4}>
          <img
            src="https://images.pexels.com/photos/1909572/pexels-photo-1909572.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            alt="My Gallery"
            className="img-fluid"
          />
        </Col>

        <Col md={4}>
          <img
            src="https://images.pexels.com/photos/1909572/pexels-photo-1909572.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            alt="My Gallery"
            className="img-fluid"
          />
        </Col>

        <Col md={4}>
          <img
            src="https://images.pexels.com/photos/1909572/pexels-photo-1909572.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            alt="My Gallery"
            className="img-fluid"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
