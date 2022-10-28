const express = require("express");
const router = express.Router();

const verifyToken = require("../miđleware/auth");
const { findOneAndUpdate } = require("../model/post");
const { deletePost, postPost, getAllPost, putPosts } = require("../context/postContext");

//@router get api/post
//@ desc get post
//@access Private
router.get("/", verifyToken, getAllPost);

//@router POST api/post
//@ desc Create post
//@access Private
router.post("/", verifyToken, postPost);

//@router PUT api/post
//@ desc PUT post
//@access Private
router.put("/:id", verifyToken, putPosts);

//@router DELETE api/post
//@ desc DELETE post
//@access Private
router.delete("/:id", verifyToken, deletePost);

module.exports = router;
