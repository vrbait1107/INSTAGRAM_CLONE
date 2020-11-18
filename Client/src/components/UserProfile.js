import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";

const UserProfile = () => {
  const [userProfile, setProfile] = useState(null);
  const { username } = useParams();

  useEffect(() => {
    axios({
      url: `/profile/${username}`,
      method: "get",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((data) => {
        console.log(username);
        console.log(data.data);
        setProfile(data.data);
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
              {userProfile && userProfile.user.username}
              <Button className="mx-3" variant="primary">
                Follow
              </Button>
            </h3>
          </div>

          <div className="mt-3">
            <h6>
              <span className="mr-3">
                {userProfile && userProfile.posts.length} Post
              </span>
              <span className="mx-3">285 Followers</span>
              <span className="mx-3">300 Following</span>
            </h6>
          </div>

          <div className="mt-3">
            <h5> {userProfile && userProfile.user.name}</h5>
            <h6>{userProfile && userProfile.user.about}</h6>
          </div>
        </Col>
      </Row>

      <Row className="mt-5">
        {userProfile &&
          userProfile.posts.map((item) => {
            return (
              <Col md={4}>
                <img
                  src={process.env.PUBLIC_URL + `/uploads/${item.photo}`}
                  alt={item._id}
                  style={{ height: 220 }}
                  className="img-fluid"
                />
              </Col>
            );
          })}{" "}
      </Row>
    </Container>
  );
};

export default UserProfile;
