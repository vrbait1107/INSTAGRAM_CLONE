import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import axios from "axios";

const Home = () => {
  const [dataValue, setDataValue] = useState([]);
  const [tpValue, setTpValue] = useState(100);

  useEffect(() => {
    axios({
      url: "/allPost",
      method: "post",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((data) => {
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

  const deletePost = (postId) => {
    axios({
      url: `/deletePost/${postId}`,
      method: "delete",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((result) => {
        const newData = dataValue.filter((item) => {
          return item._id !== result._id;
        });
        setDataValue(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteComment = (postId, commentId) => {
    axios({
      url: "/uncomment",
      method: "put",
      data: {
        commentId,
        postId,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((result) => {
        console.log(result);
        const newData = dataValue.filter((item) => {
          return item._id !== result._id;
        });
        setDataValue(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <Row>
        {dataValue.map((item) => {
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

                    {item.postedBy._id ==
                      JSON.parse(localStorage.getItem("user"))._id && (
                      <span
                        className="ml-3 float-right"
                        onClick={() => deletePost(item._id)}
                      >
                        <i className="fas text-danger fa-trash-alt fa-1x"></i>
                      </span>
                    )}
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

                  {item.comments.map((item1) => {
                    const deleteCommentDisplay = () => {
                      if (
                        item1.postedBy._id ==
                        JSON.parse(localStorage.getItem("user"))._id
                      ) {
                        return (
                          <span
                            className="mr-5 float-right"
                            onClick={() => deleteComment(item._id, item1._id)}
                          >
                            <i className="fas text-danger fa-trash-alt fa-1x"></i>
                          </span>
                        );
                      }
                    };

                    return (
                      <p>
                        <b>{item1.postedBy.username}</b> {item1.text}
                        <span>{deleteCommentDisplay()}</span>
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
