import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import styles from "../scss/Form.module.scss";
import axios from "axios";

const Login = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const postLogin = () => {
    axios({
      url: "/login",
      method: "post",
      data: {
        username: data.username,
        password: data.password,
      },
    })
      .then((data) => {
        console.log(data.data.token);
        localStorage.setItem("jwt", data.data.token);
        console.log(data);
        alert("You are Successfully Login");
        document.getElementById("loginForm").reset();
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <Container>
      <Row className={styles.login}>
        <Col md={{ span: 6, offset: 3 }}>
          <Card.Header className="my-3">
            <h3 className="text-uppercase font-time">Login</h3>
          </Card.Header>
          <Form id="loginForm">
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setData({ ...data, username: e.target.value })}
                placeholder="Enter Your Username"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => setData({ ...data, password: e.target.value })}
                placeholder="Enter Your Password"
              />
            </Form.Group>

            <Button onClick={() => postLogin()} variant="primary">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
