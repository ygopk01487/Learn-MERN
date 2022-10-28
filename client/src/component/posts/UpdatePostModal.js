import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { PostContext } from "../../context/PostContext";

const UpdatePostModal = () => {
  //context
  const {
    postState: { post },
    showEditPostModal,
    setShowEditPostModal,
    updatePosts,
    setShowToast,
  } = useContext(PostContext);

  const closeDialog = () => {
    setShowEditPostModal(false);
    setUpdatePost(post)
  };

  const [updatePost, setUpdatePost] = useState(post);

  const { title, description, url, status } = updatePost;

  useEffect(() => {
    setUpdatePost(post);
  }, [post]);

  const onChangeUpdatePostForm = (e) => {
    setUpdatePost({ ...updatePost, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { success, message } = await updatePosts(updatePost);
    setShowEditPostModal(false);
    setShowToast({ show: true, message, type: success ? "success" : "danger" });
  };


  return (
    <>
      <Modal show={showEditPostModal} onHide={closeDialog}>
        <Modal.Header closeButton>
          <Modal.Title>Marking progress?</Modal.Title>
        </Modal.Header>
        <Form onSubmit={onSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Title"
                name="title"
                required
                aria-describedby="title-help"
                value={title}
                onChange={onChangeUpdatePostForm}
              />
              <Form.Text id="title-help" muted>
                Required
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Description"
                name="description"
                value={description}
                onChange={onChangeUpdatePostForm}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Youtube Tutorial URL"
                name="url"
                value={url}
                onChange={onChangeUpdatePostForm}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                as="select"
                value={status}
                name="status"
                onChange={onChangeUpdatePostForm}
              >
                <option value="TO LEARN">TO LEARN</option>
                <option value="LEARNING">LEARNING</option>
                <option value="LEARNED">LEARNED</option>
              </Form.Control>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeDialog}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              LearnIt!
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default UpdatePostModal;
