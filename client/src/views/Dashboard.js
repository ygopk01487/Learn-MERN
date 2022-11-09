import React, { useEffect, useState } from "react";
import { PostContext } from "../context/PostContext";
import { useContext } from "react";
import { AuthContext } from "../context/Authcontext";
import SinglePost from "../component/posts/SinglePost";
import Spinner from "react-bootstrap/Spinner";
import AddPostModal from "../component/posts/AddPostModal";
import addIcon from "../assets/plus-circle-fill.svg";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Toast from "react-bootstrap/Toast";
import UpdatePostModal from "../component/posts/UpdatePostModal";
import Pagination from "react-bootstrap/Pagination";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { filterDivSearch } from "../JavaScript/searchJS";
import SearchForm from "./SearchForm";
import searchCss from "../css/searchCss.css";

const Dashboard = () => {
  //search state
  const [searchText, setSearchText] = useState({ nameSearch: "" });
  const [nameTitle, setNameTitle] = useState("");

  //* contexts
  const {
    authState: {
      user: { username },
    },
  } = useContext(AuthContext);
  const {
    postState: { postsAll, post, posts, postsLoading },
    getPosts,
    setShowAddPostModal,
    showToast: { show, message, type },
    setShowToast,
    paginationPost,
    totalPages,
  } = useContext(PostContext);

  //* set state numerage
  const [numberPage, setNumberPage] = useState(1);


  //page arr
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }


  //* start get all post
  // useEffect(() => {
  //   getPosts();
  // }, []);

  useEffect(() => {
    getPosts();
  }, []);

  //* start pagination
  useEffect(() => {
    paginationPost(numberPage, nameTitle);
    checkFilterSearch(nameTitle);
  }, [numberPage, nameTitle]);

  //* next pagination
  const nextPagin = () => {
    setNumberPage(Math.min(totalPages, numberPage + 1));
  };

  //* last pagination
  const lasttPagin = () => {
    setNumberPage(Math.max(0, numberPage - 1));
  };

  //
  const pagesNumber = (e) => {
    const numbers = parseInt(e.target.id);
    setNumberPage(numbers);
  };

  //search
  const onChangSearch = (e) => {
    setSearchText({ ...searchText, [e.target.name]: e.target.value });
  };

  const searchFilter = postsAll.filter((item) =>
    item.title.toLowerCase().includes(searchText.nameSearch.toLocaleLowerCase())
  );

  const checkFilterSearch = (nameTitle) => {
    const divSearch = document.querySelector(".divSearch");
    if (nameTitle.length !== 0) {
      divSearch.classList.remove("active");
    }
  };


  const searchData = (e) => {
    e.preventDefault()
    setNameTitle(searchText.nameSearch);
    setNumberPage(1);
  };

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
      <div
        className="search-container"
        style={{ marginTop: "10px", marginLeft: "40%" }}
      >
        <Form className="d-flex" style={{ width: "30%" }} onSubmit={searchData}>
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2 nameSearch"
            aria-label="Search"
            name="nameSearch"
            onChange={onChangSearch}
            onInput={filterDivSearch}
            value={searchText.nameSearch}
          />
          <Button
            variant="outline-success"
            className="btn-search"
            onClick={searchData}
          >
            Search
          </Button>
        </Form>
      </div>
      {/* search */}
      <SearchForm searchFilter={searchFilter} nameTitle={nameTitle} />
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
      {/* pagination */}
      {pages.length !== 0 ? (
        <div
          className="pagination-pages"
          style={{ marginTop: "50px", marginLeft: "43%" }}
        >
          <Pagination>
            <Pagination.Prev
              onClick={lasttPagin}
              disabled={numberPage === 1 ? true : false}
            />
            {pages.map((number, i) => {
              return (
                <Pagination.Item
                  key={i}
                  id={number}
                  onClick={pagesNumber}
                  active={numberPage === number ? true : false}
                >
                  {number}
                </Pagination.Item>
              );
            })}
            <Pagination.Next
              onClick={nextPagin}
              disabled={numberPage === pages.length ? true : false}
            />
          </Pagination>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Dashboard;
