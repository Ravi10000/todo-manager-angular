import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CustomInputComponent } from '../custom-input/custom-input.component';
import { TextareaComponent } from '../textarea/textarea.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-modal',
  standalone: true,
  imports: [CustomInputComponent, TextareaComponent, FormsModule],
  templateUrl: './todo-modal.component.html',
  styleUrl: './todo-modal.component.css'
})
export class TodoModalComponent {
  @Input() todo:any ={name: "", description : ""};
  @Output() closingModal = new EventEmitter();
  @Output() discardingTodo = new EventEmitter();
  closeModal(){
    this.closingModal.emit();
    this.discardingTodo.emit();
  }
}
