const express = require("express");
const router = express.Router();

const {
  addLanguage,
  getAllLanguages,
  getShowingLanguage,
  getLanguageById,
  updateLanguage,
  updateStatus,
  deleteLanguage,
} = require("../controller/languageController");

// add a language
router.post("/add", addLanguage);

// get only showing language
router.get("/show", getShowingLanguage);

// get all language
router.get("/all", getAllLanguages);

// get a language
router.get("/:id", getLanguageById);

// update a language
router.put("/:id", updateLanguage);

// show/hide a language
router.put("/status/:id", updateStatus);

// delete a language
router.patch("/:id", deleteLanguage);

module.exports = router;
