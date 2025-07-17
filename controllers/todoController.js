const Todo = require("../models/Todo");


exports.createTodoController = async (req, res) => {
  try {
    const { title, description } = req.body;
    const todo = new Todo({
      title,
      description,
      userId: req.user.id, // use JWT payload
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};


exports.getTodoController = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.id });
    res.json(todos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
exports.updateTodoController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const todo = await Todo.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { title, description },
      { new: true }
    );

    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json(todo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};


exports.deleteTodoController = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findOneAndDelete({
      _id: id,
      userId: req.user.id,
    });

    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
