import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import styles from "../scss/Form.module.scss";

const Login = () => {
  return (
    <Container>
      <Row className={styles.login}>
        <Col md={{ span: 6, offset: 3 }}>
          <h3 className="text-uppercase font-time">Login</h3>
          <Form>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter Your Username" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter Your Password" />
            </Form.Group>

            <Button variant="primary">Login</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
