const { Router } = require("express");
const formController = require("./formController");

const formRouter = Router();

formRouter.post("/", async (req, res) => {
  console.log(req.body);
  await formController.saveForm(req, res);
});

module.exports = formRouter;
