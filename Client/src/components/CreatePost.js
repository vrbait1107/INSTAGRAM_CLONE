import React from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import styles from "../scss/Form.module.scss";

const CreatePost = () => {
  return (
    <Container>
      <Row className={styles.postForm}>
        <Col md={{ span: 6, offset: 3 }}>
          <Card.Header className="my-3">
            <h3 className="text-uppercase font-time">Create Post</h3>
          </Card.Header>

          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholedr="Enter Title" />
          </Form.Group>

          <Form.Group>
            <Form.Label>Body</Form.Label>
            <Form.Control type="text" placeholedr="Enter Body" />
          </Form.Group>

          <Form.Group>
            <Form.File label="Select Image" />
          </Form.Group>

          <Button variant="primary">Submit</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default CreatePost;
