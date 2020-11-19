import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../App";
import Loader from "./Loader";

const UserProfile = () => {
  const [userProfile, setProfile] = useState(null);
  const [file, setFile] = useState(null);
  const { username } = useParams();
  const { state, dispatch } = useContext(UserContext);

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

  const updateProfile = () => {
    const dataValue = new FormData();
    dataValue.append("file", file);
    dataValue.append("_id", state._id);

    axios({
      url: "/updateProfile",
      method: "put",
      data: dataValue,
    })
      .then((data) => {
        console.log(data);
        if (data.error) {
          alert("Something Went Wrong");
        } else {
          alert("Successful");
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  const followUser = () => {
    axios({
      url: `/follow`,
      method: "put",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      data: {
        username: username,
      },
    })
      .then((data) => {
        setProfile((prevState) => {
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: [...prevState.user.followers, data.result._id],
            },
          };
        });
        dispatch({
          type: "UPDATE",
          payload: {
            following: data.result.following,
            followers: data.result.followers,
          },
        });
        localStorage.setItem("user", JSON.stringify(data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const unfollowUser = () => {
    axios({
      url: `/unfollow`,
      method: "put",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      data: {
        username: username,
      },
    })
      .then((data) => {
        setProfile((prevState) => {
          const newFollower = prevState.user.followers.filter(
            (item) => item !== data.result._id
          );
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: newFollower,
            },
          };
        });
        dispatch({
          type: "UPDATE",
          payload: {
            following: data.result.following,
            followers: data.result.followers,
          },
        });
        localStorage.setItem("user", JSON.stringify(data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {userProfile ? (
        <Container className="mt-5">
          <Row>
            <Col md={{ span: 3, offset: 2 }}>
              <img
                src={
                  process.env.PUBLIC_URL +
                  `/uploads/profileImages/${userProfile.user.profileImage}`
                }
                className="img-fluid rounded-circle"
                alt="Profile Image"
                style={{ maxHeight: 200 }}
              />

              {userProfile.user._id === state._id ? (
                <>
                  <Form.Group>
                    <Form.File
                      label="Select Image"
                      name="file"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
                    className="mx-auto"
                    onClick={() => updateProfile()}
                  >
                    Update Profile
                  </Button>
                </>
              ) : (
                " "
              )}
            </Col>
            <Col md={5}>
              <div className="d-flex flex-row">
                <h3>{userProfile.user.username}</h3>

                {userProfile.user.username !== (state & state.username) ? (
                  userProfile.user.followers.includes(state._id) ? (
                    <Button
                      className="mx-3"
                      variant="danger"
                      onClick={unfollowUser}
                    >
                      Unfollow
                    </Button>
                  ) : (
                    <Button
                      className="mx-3"
                      variant="primary"
                      onClick={followUser}
                    >
                      Follow
                    </Button>
                  )
                ) : (
                  " "
                )}
              </div>

              <div className="mt-3">
                <h6>
                  <span className="mr-3">{userProfile.posts.length} Post</span>
                  <span className="mx-3">
                    {userProfile.user.followers.length} Followers
                  </span>
                  <span className="mx-3">
                    {userProfile.user.following.length} Following
                  </span>
                </h6>
              </div>

              <div className="mt-4">
                <h5> {userProfile.user.name}</h5>
                <h6>{userProfile.user.about}</h6>
              </div>
            </Col>
          </Row>

          <Row className="mt-5">
            {userProfile.posts.map((item) => {
              return (
                <Col md={4} key={item._id}>
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
      ) : (
        <Loader />
      )}
    </>
  );
};

export default UserProfile;
