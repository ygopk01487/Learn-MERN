const express = require("express");
const { default: mongoose } = require("mongoose");

const authRouter = require("./routes/auth");
const postRouter = require("./routes/pots");
const cors = require('cors')
require("dotenv").config();

//kết nối dtb
const URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-learnit.1qur0.mongodb.net/mern-learnit?retryWrites=true&w=majority`;
const connectDTB = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
connectDTB();

const app = express();
app.use(express.json());
app.use(cors())

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);


app.get("/", (req, res) => res.send("hello word"));

const PORT = 5000;
app.listen(PORT, (req, res) =>
  console.log(`sever started on port the ${PORT}`)
);
