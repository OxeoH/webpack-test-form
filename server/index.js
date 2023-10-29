const dotenv = require("dotenv");
dotenv.config();

const express = require("express");

const cors = require("cors");
const formRouter = require("./Form/formRouter");

const app = express();

app.use(cors());

app.use(express.json());

const port = process.env.SERVER_PORT || 2345;

app.use("/form", formRouter);

const startServer = async () => {
  try {
    app.listen(port, () => console.log("SERVER START ON PORT: ", port));
  } catch (e) {
    console.log(e);
  }
};

startServer();
