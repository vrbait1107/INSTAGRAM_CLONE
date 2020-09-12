import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import styles from "../scss/Form.module.scss";
import ProgressBar from "./ProgressBar";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [file, setFile] = useState({});
  const [progress, setProgress] = useState(0);

  const data = new FormData();
  data.append("title", title);
  data.append("body", body);
  data.append("file", file);

  const postData = (e) => {
    axios({
      url: "/createPost",
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      data: data,
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        setProgress(percent);
      },
    })
      .then((data) => {
        console.log(data);
        alert("Your Post Successfully Shared");
        setProgress(0);
        document.getElementById("createPostForm").reset();
      })
      .catch((err) => {
        document.getElementById("createPostForm").reset();
        console.log(err);
        alert(err);
      });
  };

  return (
    <Container>
      <Row className={styles.postForm}>
        <Col md={{ span: 6, offset: 3 }}>
          <Card.Header className="my-3">
            <h3 className="text-uppercase font-time">Create Post</h3>
          </Card.Header>

          <Form id="createPostForm" encType="multipart/form-data">
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholedr="Enter Title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Body</Form.Label>
              <Form.Control
                type="text"
                placeholedr="Enter Body"
                onChange={(e) => setBody(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.File
                label="Select Image"
                name="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Form.Group>

            <ProgressBar progress={progress} />

            <Button
              variant="primary"
              className="mt-3"
              onClick={() => postData()}
            >
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreatePost;
