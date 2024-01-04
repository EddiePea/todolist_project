const Todo = require('../lib/todo');
const TodoList = require('../lib/todolist');

describe('TodoList', () => {
  let todo1;
  let todo2;
  let todo3;
  let list;

  beforeEach(() => {
    todo1 = new Todo('Buy milk');
    todo2 = new Todo('Clean room');
    todo3 = new Todo('Go to the gym');

    list = new TodoList("Today's Todos");
    list.add(todo1);
    list.add(todo2);
    list.add(todo3);
  });

  test('todolist has a size of 3', () => {
    expect(list.size()).toBe(3);
  });

  test('calling toArray returns the list in array form', () => {
    expect(list.toArray()).toEqual([todo1, todo2, todo3]);
  });

  test('calling first returns the first object element in the list', () => {
    expect(list.first()).toEqual(todo1);
  });

  test('calling last returns the last object element in the list', () => {
    expect(list.last()).toEqual(todo3);
  });

  test('calling shift removes and returns the first item in the list', () => {
    let todo = list.shift();
    expect(todo).toEqual(todo1);
    expect(list.toArray()).toEqual([todo2, todo3]);
  });

  test('calling pop removes and returns the last item in the list', () => {
    let todo = list.pop();
    expect(todo).toEqual(todo3);
    expect(list.toArray()).toEqual([todo1, todo2]);
  });

  test('calling isDone returns true when all list items are done, false otherwise', () => {
    expect(list.isDone()).toBeFalsy();
    list.markAllDone();
    expect(list.isDone()).toBeTruthy();
  });

  test('calling add throws a TypeError when you try to add a non-todo object to the list', () => {
    expect(() => list.add(1)).toThrow(TypeError);
    expect(() => list.add('hi')).toThrow(TypeError);

    let secondList = new TodoList('Second List');
    expect(() => list.add(secondList)).toThrow(TypeError);
  });

  test('calling itemAt returns the item at a given index number and raises a RefError if specify index with no element', () => {
    expect(list.itemAt(0)).toEqual(todo1);
    expect(list.itemAt(1)).toEqual(todo2);
    expect(() => list.itemAt(4)).toThrow(ReferenceError);
  });

  test('calling markDoneAt marks a todo done at a given index and raises RefError if specify index with no element', () => {
    list.markDoneAt(0);
    expect(todo1.isDone()).toBe(true);
    expect(todo2.isDone()).toBe(false);
    expect(todo3.isDone()).toBe(false);
    expect(() => list.markDoneAt(4).toThrow(ReferenceError));
  });

  test('calling markUndoneAt marks a todo not done at a given index and raises a refError if index specified with no element', () => {
    list.markAllDone();
    list.markUndoneAt(1);

    expect(todo1.isDone()).toBe(true);
    expect(todo2.isDone()).toBe(false);
    expect(todo3.isDone()).toBe(true);

    expect(() => list.markUndoneAt(4)).toThrow(ReferenceError);
  });

  test('calling markAllDone marks all todos in the list as done', () => {
    list.markAllDone();
    expect(todo1.isDone()).toBe(true);
    expect(todo2.isDone()).toBe(true);
    expect(todo3.isDone()).toBe(true);
    expect(list.isDone()).toBe(true);
  });

  test('calling removeAt removes a todo item at a given index and raises refError if the arg does not identify a todo item', () => {
    expect(list.removeAt(0)).toEqual(todo1);
    expect(list.toArray()).toEqual([todo2, todo3]);
    expect(() => list.removeAt(4).toThrow(ReferenceError));
  });

  test('toString returns string representation of the lit', () => {
    let string = `---- Today's Todos ----
[ ] Buy milk
[ ] Clean room
[ ] Go to the gym`;

    expect(list.toString()).toBe(string);
  });

  test('calling forEach iterates over each element in the list', () => {
    let result = [];
    list.forEach(todo => result.push(todo));
    expect(result).toEqual([todo1, todo2, todo3]);
  });

  test('filter selects the relevant todos according to entered criteria and returns new todoList object', () => {
    todo1.markDone();
    let newList = new TodoList(list.title);
    newList.add(todo1);

    let doneItems = list.filter(todo => todo.isDone());
    expect(doneItems.toString()).toBe(newList.toString());
  });

});