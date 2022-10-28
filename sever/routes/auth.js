const express = require("express");
const router = express.Router();
const { response } = require("express");
const verifyToken = require('../miđleware/auth');
const { getAllAuth, registerAuth, loginAuth } = require("../context/authContext");

// router.get("/user", (req, res) => {
//   res.send("user ROUTE");
// });

//@router GET API/auth
//@desc Check if user is logged in
//@access Public
router.get("/", verifyToken, getAllAuth);

router.post("/register", registerAuth);

router.post("/login", loginAuth);

module.exports = router;
