const Post = require("../model/post");

//@router get api/post
//@ desc get post
//@access Private
const getAllPost = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.userId }).populate("user", [
      "username",
    ]);
    res.json({ success: true, posts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

//POst post
const postPost = async (req, res) => {
  const { title, description, url, status } = req.body;

  //Simple validation
  if (!title) {
    return res
      .status(400)
      .json({ success: false, messgage: "Title is require" });
  }
  try {
    const newPost = new Post({
      title,
      description,
      url: url.startsWith("https://") ? url : `https://${url}`,
      status: status || "TO LEARN",
      user: req.userId,
    });
    await newPost.save();
    res.json({ success: true, message: "HAPPY TO LEARN", post: newPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

//PUT
const putPosts = async (req, res) => {
  const { title, description, url, status } = req.body;
  //Simple validation
  if (!title) {
    return res
      .status(400)
      .json({ success: false, messgage: "Title is require" });
  }
  try {
    let updatedPost = {
      title,
      description: description || "",
      url: (url.startsWith("https://") ? url : `https://${url}`) || "",
      status: status || "TO LEARN",
    };

    const postUpdateCondition = { _id: req.params.id, user: req.userId };

    updatedPost = await Post.findOneAndUpdate(
      postUpdateCondition,
      updatedPost,
      { new: true }
    );

    // User not authorised to update post or post not found
    if (!updatedPost)
      return res.status(401).json({
        success: false,
        message: "Post not found or user not authorised",
      });

    res.json({
      success: true,
      message: "Excellent progress!",
      post: updatedPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

//delete
const deletePost = async (req, res) => {
  try {
    const postDeleteCondition = { _id: req.params.id, user: req.userId };
    const deletePost = await Post.findOneAndDelete(postDeleteCondition);
    // User not authorised to update post or post not found
    if (!deletePost)
      return res.status(401).json({
        success: false,
        message: "Post not found or user not authorised",
      });
    res.json({ success: true, post: deletePost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

//pagination
const paginationPost = async (req, res) => {
  const pageSize = 2;
  let page = parseInt(req.query.page) || 1;
  const { title } = req.query || "";

  try {
    const total = await Post.countDocuments({
      user: req.userId,
      title: { $regex: title, $options: "i" },
    });

    const posts = await Post.find({
      user: req.userId,
      title: { $regex: title, $options: "i" },
    })
      .populate("user", ["username"])
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({
      success: true,
      page,
      totalPage: Math.ceil(total / pageSize),
      posts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

//search
// const searchPost = async (req, res) => {
//   const pageSize = 2;
//   const page = parseInt(req.query.page) || 1;
//   const { title } = req.query;
//   console.log("tên title: " + title);
//   try {
//     const total = await Post.countDocuments({
//       user: req.userId,
//       title: { $regex: title, $options: "i" },
//     });
//     console.log("Tổng: " + total);
//     const posts = await Post.find({
//       user: req.userId,
//       title: { $regex: title, $options: "i" },
//     })
//       .populate("user", ["username"])
//       .limit(pageSize)
//       .skip(pageSize * (page - 1));
//     console.log("Danh sách: " + posts);
//     res.json({
//       success: true,
//       page,
//       totalPage: Math.ceil(total / pageSize),
//       posts,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };

// const searchPost = async (req, res) => {
//   // const { title } = req.body;
//   const { title } = req.query;
//   console.log(title);
//   try {
//     const posts = await Post.find({
//       user: req.userId,
//       title: { $regex: title, $options: 'i' },
//     }).populate("user", ["username"]);
//     console.log("danh sách: " + posts);
//     res.json({ success: true, posts });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };

module.exports = {
  getAllPost,
  postPost,
  putPosts,
  deletePost,
  paginationPost,
};
