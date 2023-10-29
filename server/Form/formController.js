const { Request, Response } = require("express");

class FormController {
  async saveForm(req, res) {
    try {
      const { inputs } = req.body;

      console.log("Form inputs: ", inputs);

      res.status(200).json({ status: "success", msg: "Ваша заявка успешно отправлена!" });
    } catch (e) {
      res.status(500).json({ message: `Error: ${e}` });
    }
  }
}

module.exports = new FormController();
