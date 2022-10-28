import React from "react";
import ActionButtons from "./ActionButtons";

const SinglePost = ({ post: { _id, status, title, description, url } }) => {
  return (
    <div
      className={
        status === "LEARNED"
          ? "card w-50 border border-success"
          : status === "LEARNING"
          ? "card w-50 border border-warning"
          : "card w-50 border border-danger"
      }
      style={{ marginTop: "30px", borderRadius: "10px", marginLeft: "15px" }}
    >
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <span
          className={
            status === "LEARNED"
              ? "badge text-bg-success"
              : status === "LEARNING"
              ? "badge text-bg-warning"
              : "badge text-bg-danger"
          }
        >
          {status}
        </span>
        <p className="card-text" style={{ paddingTop: "10px" }}>
          {description}
        </p>
        <ActionButtons _id={_id} url={url} />
      </div>
    </div>
  );
};
export default SinglePost;
