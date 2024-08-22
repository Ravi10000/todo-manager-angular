import { Component, EventEmitter, Output, Input } from '@angular/core';
import { TextareaComponent } from '../textarea/textarea.component';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-todo-modal',
  standalone: true,
  imports: [TextareaComponent, FormsModule, NgIf],
  templateUrl: './todo-modal.component.html',
  styleUrl: './todo-modal.component.css'
})
export class TodoModalComponent {
  @Input() todo:any = {name: "", description : ""};
  @Output() closingModal = new EventEmitter();
  @Output() changeValue = new EventEmitter<any>();

  name = "";
  closeModal(){
    this.closingModal.emit();
  }
  handleSave(){
    console.log({todo: this.todo, name: this.name});
  }
}
