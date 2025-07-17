const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

const {
  createTodoController,
  getTodoController,
  updateTodoController,
  deleteTodoController,
} = require("../controllers/todoController");

// ✅ All good
router.post("/create", authMiddleware, createTodoController);
router.get("/get", authMiddleware, getTodoController);
router.patch("/update/:id", authMiddleware, updateTodoController);
router.delete("/delete/:id", authMiddleware, deleteTodoController);

module.exports = router;
