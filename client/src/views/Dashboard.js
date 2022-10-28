import React, { useEffect } from "react";
import { PostContext } from "../context/PostContext";
import { useContext } from "react";
import { AuthContext } from "../context/Authcontext";
import SinglePost from "../component/posts/SinglePost";
import Spinner from "react-bootstrap/Spinner";
import AddPostModal from "../component/posts/AddPostModal";
import addIcon from "../assets/plus-circle-fill.svg";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";
import UpdatePostModal from "../component/posts/UpdatePostModal";

const Dashboard = () => {
  //* contexts
  const {
    authState: {
      user: { username },
    },
  } = useContext(AuthContext);
  const {
    postState: { post, posts, postsLoading },
    getPosts,
    setShowAddPostModal,
    showToast: { show, message, type },
    setShowToast,
  } = useContext(PostContext);

  //* start get all post
  useEffect(() => {
    getPosts();
  }, []);

  let body = null;
  if (postsLoading) {
    body = (
      <>
        <div className="spinner-container">
          <Spinner animation="border" variant="info" />
        </div>
      </>
    );
  } else if (posts.length === 0) {
    body = (
      <>
        <div
          className="card text-center"
          style={{ width: "80%", margin: "auto", marginTop: "20px" }}
        >
          <div className="card-header">Hi {username} </div>
          <div className="card-body">
            <h5 className="card-title">Welcome to learnIt</h5>
            <p className="card-text">
              Click the button below to track your firts skill to learn
            </p>
            <a
              href="#"
              className="btn btn-primary"
              onClick={setShowAddPostModal.bind(this, true)}
            >
              LearnIt!
            </a>
          </div>
        </div>
      </>
    );
  } else {
    body = (
      <>
        <div
          className="container-das"
          style={{ display: "grid", gridTemplateColumns: "auto auto auto" }}
        >
          {posts.map((post) => {
            return <SinglePost post={post} key={post._id} />;
          })}
        </div>

        {/* Open add post modal */}
        <OverlayTrigger
          placement="left"
          overlay={<Tooltip>Add a new thing to learn</Tooltip>}
        >
          <button
            className="btn btn-floating"
            onClick={setShowAddPostModal.bind(this, true)}
          >
            <img src={addIcon} alt="add-post" width="40" heigth="40" />
          </button>
        </OverlayTrigger>
      </>
    );
  }
  return (
    <>
      {body}
      <AddPostModal />
      {post !== null && <UpdatePostModal />}
      {/* after post is added, show toast */}
      <Toast
        show={show}
        style={{ position: "fixed", top: "15%", right: "10px" }}
        className={`bg-${type} text-white`}
        onClose={setShowToast.bind(this, {
          show: false,
          message: "",
          type: null,
        })}
        delay={3000}
        autohide
      >
        <Toast.Body>
          <strong>{message}</strong>
        </Toast.Body>
      </Toast>
    </>
  );
};

export default Dashboard;
