const Language = require("../models/Language");

const addLanguage = async (req, res) => {
  try {
    const newLanguage = new Language(req.body);
    await newLanguage.save();
    res.send({
      message: "Language added successfully!",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getAllLanguages = async (req, res) => {
  try {
    const languages = await Language.find({});
    res.send(languages);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getShowingLanguage = async (req, res) => {
  try {
    const languages = await Language.find({ status: "show" }).sort({
      _id: -1,
    });
    res.send(languages);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getLanguageById = async (req, res) => {
  try {
    const language = await Language.findById(req.params.id);
    res.send(language);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const updateLanguage = async (req, res) => {
  try {
    const language = await Language.findById(req.params.id);
    if (language) {
      language.name = req.body.name;
      language.iso_code = req.body.iso_code;
      language.flag = req.body.flag;
      language.status = req.body.status;
    }
    await language.save();
    res.send({
      message: "Language updated successfully!",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const updateStatus = async (req, res) => {
  try {
    const newStatus = req.body.status;

    await Language.updateOne(
      { _id: req.params.id },
      {
        $set: {
          status: req.body.status,
        },
      }
    );
    res.status(200).send({
      message: `Language ${
        newStatus === "show" ? "Published" : "Un-Published"
      } Successfully!`,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const deleteLanguage = async (req, res) => {
  try {
    await Language.deleteOne({ _id: req.params.id });
    res.send({
      message: "Delete language successfully!",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

module.exports = {
  addLanguage,
  getAllLanguages,
  getShowingLanguage,
  getLanguageById,
  updateLanguage,
  updateStatus,
  deleteLanguage,
};
