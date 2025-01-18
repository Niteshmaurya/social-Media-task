const express = require("express");
const router = express.Router();
const { createUser } = require("../controller/createUser");
const { getUser } = require("../controller/getUsers");
const upload = require("../config/multerConfig");

router.post("/createUser", upload.array("images", 5), createUser);
router.post("/getallUsers", getUser);

module.exports = router;
