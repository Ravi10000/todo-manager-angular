import { Injectable } from '@angular/core';
import { Todo } from '../interfaces/todo.interface';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  // private todosSource = new Subject<Todo[]>();
  // todos$ = this.todosSource.asObservable();
  todos$ = new BehaviorSubject<Todo[]>([]);
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
    this.todos$.next(todos);
  }
  addTodo(todo: Todo) {
    this.todos$.next([todo, ...this.todos]);
  }
  insertTodo(todo: Todo, index: number) {
    const _temp = [...this.todos];
    _temp.splice(index, 0, todo);
    this.todos$.next(_temp);
  }
  removeTodo(index: number) {
    const _temp = [...this.todos];
    _temp.splice(index, 1);
    this.todos$.next(_temp);
  }
  toggleTodo(index: number) {
    const _temp = [...this.todos];
    _temp[index].completed = !_temp[index].completed;
    this.todos$.next(_temp);
  }
  updateTodo(todo: Todo) {
    this.todos$.next(
      this.todos.map((_todo) => {
        if (_todo?._id === todo?._id) return todo;
        return _todo;
      })
    );
  }
}
