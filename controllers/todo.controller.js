const TodoModel  = require("../models/todo.model");

exports.createTodo = async (req, res, next) =>{
  try{
    const newTodoFromDB = await TodoModel.create(req.body);
    res.status(201).json(newTodoFromDB);
  }catch(error){
    console.log("error is : " + JSON.stringify(error));
    next(error);
  }
}