const Todo = require("./todo.js");

class TodoList {
  constructor(title) {
    this.title = title;
    this.todos = [];
  }

  add(todo) {
    if (!(todo instanceof Todo)) {
      throw new TypeError("can only add todo objects");
    }
    this.todos.push(todo);
  }

  size() {
    return this.todos.length;
  }

  first() {
    return this.todos[0];
    //No need to explicitly return `undefined` 
    //If you try to return element value where there is no value at the index position, returns undefined
  }

  last() {
    return this.todos[this.size() - 1];
  }

  itemAt(indx) {
    this._validateIndx(indx);
    return this.todos[indx];
  }

  markDoneAt(indx) {
    this.itemAt(indx).markDone();
  }

  markUndoneAt(indx) {
    this.itemAt(indx).markUndone();
  }

  isDone() {
    return this.todos.every(todo => todo.isDone());
  }

  shift() {
    return this.todos.shift();
  }

  pop() {
    return this.todos.pop();
  }

  removeAt(indx) {
    this._validateIndx(indx);
    return this.todos.splice(indx, 1)[0];
  }

  toString() {
    let title = `---- ${this.title} ----`;
    let list = this.todos.map(todo => todo.toString()).join("\n");
    return `${title}\n${list}`;
  }
//`title` variable declared and initialised with template literal 
//`list` variable declared and initialized with return value of `map` method call
  //called on `todos` array
  //iterates through array and on each element invokes the `toString` method of the `todo` object
  //joins the resulting array of strings with a new line marker between them

forEach(callback) {
  this.todos.forEach(callback);
}

//`Array.prototype.forEach` is not the same as `TodoList.prototype.forEach`
  //Similar methods, but the `TodoList` version only works on `Todo` objects
  //Array.prototype version works with all arrays

filter(callback) {
  let filteredTodos = new TodoList(this.title);

  this.forEach(todo => {
    if (callback(todo)) {
      filteredTodos.add(todo);
      }
    });
    return filteredTodos;
  }

//Call `this.forEach` method on the list object instance
  //pass it a CBF
  //CBF -> takes each todo
  //if the CBF passed to filter, pass in `todo` as param returns truthy value
  //then add that todo to the empty arr
  //return empty arr 

  findByTitle(title) {
    return this.filter(todo => todo.getTitle() === title).first();
    //remember to try to use the methods rather than accessing properties directly
  }

  allDone() {
    return this.filter(todo => todo.isDone());
  }

  allNotDone() {
    return this.filter(todo => !(todo.isDone()));
  }

  markDone(title) {
    let todo = this.findByTitle(title);
    if (todo !== undefined) {
      todo.markDone();
    }
  }

  markAllDone() {
    this.forEach(todo => todo.markDone());
  }

  markAllUndone() {
    this.forEach(todo => todo.markUndone());
  }

  toArray() {
    return this.todos.slice();
  }

  _validateIndx(indx) {
    //Name indicates `private` method 
      //means it shouldn't be used from outside the class
    if (!(indx in this.todos)) {
      throw new ReferenceError(`Invalid index: ${indx}`);
      //Throws reference error, even if it's the wrong type - for simplicity 
    }
  }
}

module.exports = TodoList;


//Takes CBF argument 
  //call it for each todo object in the list - each object elemtn in todo array
  //with todo object as an argument

//This gives us a standard way of iterating through the todos on a todo list

//BUILD A FILTER METHOD

//Takes CBF argument
  //Called on the `list` object instance
  //If CBF returns truthy value, then `filter` method adds element to array and returns it

//Adjust `filter` method so that it returns a `TodoList` object, not an array


let todo1 = new Todo("Buy milk");
let todo2 = new Todo("Clean room");
let todo3 = new Todo("Go to the gym");
let todo4 = new Todo("Go shopping");
let todo5 = new Todo("Feed the cats");
let todo6 = new Todo("Study for Launch School");
let todo7 = new Todo("Go shopping");
let list = new TodoList("Today's Todos");

list.add(todo1);
list.add(todo2);
list.add(todo3);
list.add(todo4);
list.add(todo5);
list.add(todo6);
list.add(todo7);

//list.forEach(todo => console.log(todo.toString()));

//todo1.markDone();
//todo5.markDone();

let doneTodos = list.filter(todo => todo.isDone());
//console.log(doneTodos);

//console.log(list.filter(todo => todo.isDone()).first());

//FIND BY TITLE

//returns first `Todo` object from `list` that matches the string title
//returns `undef` if no such todo

//Iterate through `list` property of `Todo` object in `Todo` list 
  //Look at `title `property of each `Todo` object
  //If there's a match, return the `todo` object 
  //Otherwise, if nothing return undefined 

    //possible methods
      //find 
  
//console.log(list.findByTitle("Feed the cats"));
//console.log(list.findByTitle("Eat bath bomb"));

//console.log(list.allDone());
//console.log(list.allNotDone());

list.markDone("Feed the cats");
list.markDone("Go shopping");

//console.log(list.toString());

list.markAllDone();
//console.log(list.toString());

list.markAllUndone();
//console.log(list.toString());

let copyList = list.toArray();
copyList.push('HELLO');
console.log(copyList);
//console.log(list);



