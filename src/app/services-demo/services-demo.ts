import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../services/todo.service';

// ------------------------------------------------------------------
// USING A SERVICE (Dependency Injection in action)
// ------------------------------------------------------------------
// Angular's DI system automatically creates and provides services.
//
// Two ways to inject a service:
//
//  OLD way (constructor injection):
//    constructor(private todoService: TodoService) {}
//
//  NEW way (inject() function — Angular 14+, preferred):
//    todoService = inject(TodoService);
//
// The service is NOT in the imports array — only directives/pipes/
// components go there. Services are provided via @Injectable.
// ------------------------------------------------------------------

@Component({
  selector: 'app-services-demo',
  imports: [FormsModule],
  templateUrl: './services-demo.html',
})
export class ServicesDemo implements OnInit {

  // inject() is the modern way — cleaner, works outside constructors too
  private todoService = inject(TodoService);

  // Get reactive signal references from the service.
  // These automatically update the UI when the service's data changes.
  todos         = this.todoService.getTodos();
  completedCount = this.todoService.completedCount;
  totalCount     = this.todoService.totalCount;

  newTodoText = '';  // bound to the input via [(ngModel)]

  ngOnInit() {
    // The service already has initial data — nothing to load here.
    // In a real app you'd call: this.todoService.loadFromApi();
    console.log('ServicesDemo: injected TodoService singleton');
  }

  addTodo() {
    if (this.newTodoText.trim()) {
      this.todoService.addTodo(this.newTodoText);
      this.newTodoText = '';  // clear the input field after adding
    }
  }

  toggleTodo(id: number) {
    this.todoService.toggleTodo(id);
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id);
  }
}
