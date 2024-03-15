const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

// GET : API to read user data
router.get("/", UserController.getAllUsers);  

// POST : API to create user data
router.post("/", UserController.createUser);

// PUT : API to update user data
router.put("/:id", UserController.updateUser);

// DELETE : API to delete user data
router.delete("/:id", UserController.deleteUser);

module.exports = router;
