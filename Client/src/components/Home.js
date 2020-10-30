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

  const makeComment = (value, id) => {
    axios.post({
      url: "/comment",
      method: "post",
    });
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

                  <div className="ml-3 mb-3">
                    <h6>{item.title}</h6>
                    <p>{item.body}</p>

                    <a href="#">View All Comments</a>
                  </div>

                  <Form
                    onSubmit={(e) => makeComment(e.target[0].value, item._id)}
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
