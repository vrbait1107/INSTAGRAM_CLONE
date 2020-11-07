import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import axios from "axios";

const Home = () => {
  const [dataValue, setDataValue] = useState([]);

  useEffect(() => {
    axios({
      url: "/allPost",
      method: "post",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((data) => {
        console.log(data.data);
        setDataValue(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const makeComment = (text, postId) => {
    axios({
      url: "/comment",
      method: "put",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      data: {
        postId,
        text,
      },
    }).then((result) => {
      const newData = dataValue.map((item, index) => {
        if (item._id === result._id) {
          return result;
        } else {
          return item;
        }
      });
      setDataValue(newData);
    });
    document.getElementById(postId).reset();
  };

  return (
    <Container>
      <Row>
        {dataValue &&
          dataValue.map((item) => {
            return (
              <Col key={item._id} className="my-4" md={{ span: 6, offset: 3 }}>
                <Card>
                  <Card.Header>
                    <h5>
                      <img
                        src="https://raw.githubusercontent.com/vrbait1107/vrbait1107.github.io/master/images/Vishal%20Bait.jpg"
                        className="img-fluid mr-4 rounded-circle"
                        alt="Profile Image"
                        style={{ maxHeight: 50 }}
                      />
                      {item.postedBy.username}
                    </h5>
                  </Card.Header>

                  <Card.Body>
                    <img
                      src={process.env.PUBLIC_URL + `/uploads/${item.photo}`}
                      alt={item._id}
                      className="img-fluid w-100"
                    />
                  </Card.Body>

                  <div className="d-flex ml-3 mb-3">
                    <span className="ml-3">
                      0 <i className="fas  text-primary fa-thumbs-up fa-1x"></i>
                    </span>
                    <span className="ml-2">
                      0{" "}
                      <i className="fas text-secondary fa-thumbs-down fa-1x"></i>
                    </span>
                  </div>

                  <div className="ml-3 mb-3">
                    <h6>{item.title}</h6>
                    <p>{item.body}</p>

                    {item.comments.map((item) => {
                      return (
                        <p>
                          <b>{item.postedBy.username}</b> {item.text}
                        </p>
                      );
                    })}

                    <a href="#">View All Comments</a>
                  </div>

                  <Form
                    id={item._id}
                    onSubmit={(e) => {
                      makeComment(e.target[0].value, item._id);
                      e.preventDefault();
                    }}
                  >
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Add Comment"
                    />
                  </Form>
                </Card>
              </Col>
            );
          })}
      </Row>
    </Container>
  );
};

export default Home;
