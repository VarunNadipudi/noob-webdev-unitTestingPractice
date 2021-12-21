const TodoController  = require("../../controllers/todo.controller");
const TodoModel = require("../../models/todo.model");
const httpMocks = require("node-mocks-http");
const newTodo  = require("../../mocks-data/new-todo.json");

TodoModel.create = jest.fn();

//1.test suite
//2.should have a createTodo function
//3.should call TododModel.create()
//4.should return a 201 response code
//5.should return JSON body in response
//6.should handle errors

let req, res, next;
beforeEach(() =>{
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});


//test suite for TodoController.createTodo
describe("TodoController.createTodo", () =>{

  //should have a createTodo function
  it("Should have a createTodo function", () =>{
    expect(typeof TodoController.createTodo).toBe("function");
  });

  //should call TodoModel.create()
  //here the TodoController.createTodo() will call the TodoModel.create() in its function
  it("should call TodoModel.create()", async ()=>{
    await TodoController.createTodo(req, res, next);
    expect(TodoModel.create).toBeCalled();
  });

  //should return a 201 response code
  it("should return a 201 response code", async () =>{
    await TodoController.createTodo(req, res, next);
    expect(res.statusCode).toBe(201);
  });

  //should return JSON body in response
  it("should return JSON body in response", async() =>{
    req.body = newTodo;

    TodoModel.create.mockReturnValue(newTodo);

    await TodoController.createTodo(req, res, next);
    
    expect(res.statusCode).toBe(201);
    expect(res._getJSONData()).toStrictEqual(newTodo);
  });

  //should handle errors
  it("should handle errors", async () =>{
    const errorMessage = {message : "Completed property missing"};
    const rejectedPromise = Promise.reject(errorMessage);

    TodoModel.create.mockReturnValue(rejectedPromise);

    await TodoController.createTodo(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });


});

