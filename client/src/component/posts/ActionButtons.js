import React, { useContext } from "react";
import playIcon from "../../assets/play-btn.svg";
import editIcon from "../../assets/pencil.svg";
import deleteIcon from "../../assets/trash.svg";
import { PostContext } from "../../context/PostContext";

const ActionButtons = ({ url, _id }) => {
  const { deletePosts, findPost, setShowEditPostModal } = useContext(PostContext);

  const choosePost = (postId) => {
    findPost(postId);
    setShowEditPostModal(true)
  };

  return (
    <>
      {" "}
      <div className="d-grid gap-2 d-md-block">
        <button className="btn " type="button">
          <img src={playIcon} alt="play" width="32" height="32" />
        </button>
        <button
          className="btn "
          type="button"
          style={{ marginLeft: "10px" }}
          onClick={choosePost.bind(this, _id)}
        >
          <img src={editIcon} alt="play" width="32" height="32" />
        </button>
        <button
          className="btn"
          type="button"
          style={{ marginLeft: "10px" }}
          onClick={deletePosts.bind(this, _id)}
        >
          <img src={deleteIcon} alt="play" width="32" height="32" />
        </button>
      </div>
    </>
  );
};

export default ActionButtons;
