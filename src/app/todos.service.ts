import { Injectable } from '@angular/core';
import { Todo } from '../interfaces/todo.interface';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private todosSource = new Subject<Todo[]>();
  todos$ = this.todosSource.asObservable();
  todos: Todo[] = [];

  constructor() {
    this.todos$.subscribe((value) => {
      this.todos = value;
    });
  }

  getAllTodos() {
    return this.todos;
  }
  setTodos(todos: Todo[]) {
    this.todosSource.next(todos);
  }
  addTodo(todo: Todo) {
    this.todosSource.next([todo, ...this.todos]);
  }
  insertTodo(todo: Todo, index: number) {
    const _temp = [...this.todos];
    _temp.splice(index, 0, todo);
    this.todosSource.next(_temp);
  }
  removeTodo(index: number) {
    const _temp = [...this.todos];
    _temp.splice(index, 1);
    this.todosSource.next(_temp);
  }
  toggleTodo(index: number) {
    const _temp = [...this.todos];
    _temp[index].completed = !_temp[index].completed;
    this.todosSource.next(_temp);
  }
  updateTodo(todo: Todo) {
    this.todosSource.next(
      this.todos.map((_todo) => {
        if (_todo?._id === todo?._id) return todo;
        return _todo;
      })
    );
  }
}
