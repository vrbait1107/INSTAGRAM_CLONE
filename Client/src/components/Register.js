import React from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import styles from "../scss/Form.module.scss";

const Register = () => {
  return (
    <Container>
      <Row className={styles.login}>
        <Col md={{ span: 6, offset: 3 }}>
          <Card.Header className="my-3">
            <h3 className="text-uppercase font-time">Register</h3>
          </Card.Header>

          <Form>
            <Form.Group>
              {/* <Form.Label>Username</Form.Label> */}
              <Form.Control
                type="text"
                className="rounded-pill"
                placeholder="Enter Your Username"
              />
            </Form.Group>

            <Form.Group>
              {/* <Form.Label>Email</Form.Label> */}
              <Form.Control
                type="email"
                className="rounded-pill"
                placeholder="Enter Your Email"
              />
            </Form.Group>

            <Form.Group>
              {/* <Form.Label>Name</Form.Label> */}
              <Form.Control
                type="text"
                className="rounded-pill"
                placeholder="Enter Your Name"
              />
            </Form.Group>

            <Form.Group>
              {/* <Form.Label>Password</Form.Label> */}
              <Form.Control
                type="password"
                className="rounded-pill"
                placeholder="Enter Your Password"
              />
            </Form.Group>

            <Form.Group>
              {/* <Form.Label>Confirm Password</Form.Label> */}
              <Form.Control
                type="password"
                className="rounded-pill"
                placeholder="Confirm Your Password"
              />
            </Form.Group>

            <Button variant="primary" className="mx-auto">
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
