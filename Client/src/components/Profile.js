import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import { UserContext } from "../App";

const Profile = () => {
  const [pics, setPics] = useState([]);
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    axios({
      url: "/myPosts",
      method: "post",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((data) => {
        console.log(data.data);
        setPics(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
              {state && state.username}
              {console.log(state)}
              <Button className="mx-3" variant="primary">
                Follow
              </Button>
            </h3>
          </div>

          <div className="mt-3">
            <h6>
              <span className="mr-3">{pics && pics.length} Post</span>
              <span className="mx-3">285 Followers</span>
              <span className="mx-3">300 Following</span>
            </h6>
          </div>

          <div className="mt-3">
            <h5> {state && state.name}</h5>
            <h6>{state && state.about}</h6>
          </div>
        </Col>
      </Row>

      <Row className="mt-5">
        {pics.map((item) => {
          return (
            <Col md={4} className="mb-5">
              <img
                src={process.env.PUBLIC_URL + `/uploads/${item.photo}`}
                alt={item._id}
                style={{ height: 220 }}
                className="img-fluid"
              />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default Profile;
