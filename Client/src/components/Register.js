import React, { useState, useContext } from "react";
import { Container, Card, Row, Col, Form, Button } from "react-bootstrap";
import styles from "../scss/Form.module.scss";
import axios from "axios";
import { UserContext } from "../App";

const Register = () => {
  const [data, setData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    conPassword: "",
  });

  const postRegister = () => {
    axios({
      url: "/signup",
      method: "post",
      data: {
        name: data.name,
        username: data.username,
        password: data.password,
        email: data.email,
      },
    })
      .then((data) => {
        console.log(data);
        if (data.error) {
          alert("Something Went Wrong");
        } else {
          alert("Successful");
          document.getElementById("registerForm").reset();
        }
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
            <h3 className="text-uppercase font-time">Register</h3>
          </Card.Header>

          <Form id="registerForm">
            <Form.Group>
              <Form.Control
                type="text"
                className="rounded-pill"
                placeholder="Enter Your Username"
                onChange={(e) => setData({ ...data, username: e.target.value })}
              />
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="email"
                className="rounded-pill"
                placeholder="Enter Your Email"
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="text"
                className="rounded-pill"
                placeholder="Enter Your Name"
                name="name"
                onChange={(e) => setData({ ...data, name: e.target.value })}
              />
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="password"
                className="rounded-pill"
                placeholder="Enter Your Password"
                name="password"
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="password"
                className="rounded-pill"
                placeholder="Confirm Your Password"
                name="conPassword"
                onChange={(e) =>
                  setData({ ...data, conPassword: e.target.value })
                }
              />
            </Form.Group>

            <Button
              variant="primary"
              className="mx-auto"
              onClick={() => postRegister()}
            >
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
