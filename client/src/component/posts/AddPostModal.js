import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { PostContext } from "../../context/PostContext";

const AddPostModal = () => {
  //context
  const { showAddPostModal, setShowAddPostModal, addPosts, setShowToast } =
    useContext(PostContext);

  const closeDialog = () => {
    resetAddPostData()
  };

  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    url: "",
    status: "TO LEARN",
  });

  const { title, description, url, status } = newPost;

  const onChangeNewPostForm = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { success, message } = await addPosts(newPost);
    resetAddPostData();
    setShowToast({show: true, message, type: success ? 'success' : 'danger'})
  };

  const resetAddPostData = () => {
    setNewPost({ title: "", description: "", url: "", status: "TO LEARN" });
    setShowAddPostModal(false);
  };

  return (
    <>
      <Modal show={showAddPostModal} onHide={closeDialog}>
        <Modal.Header closeButton>
          <Modal.Title>What do you want to learn?</Modal.Title>
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
                onChange={onChangeNewPostForm}
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
                onChange={onChangeNewPostForm}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Youtube Tutorial URL"
                name="url"
                value={url}
                onChange={onChangeNewPostForm}
              />
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

export default AddPostModal;
