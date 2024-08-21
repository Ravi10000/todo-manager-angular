import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-textarea',
  standalone: true,
  imports: [],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.css'
})
export class TextareaComponent {
@Input()
label = "";
@Input()
id = "";
@Input()
value = "";
@Output()
  inputChange = new EventEmitter<string>();

  onInput(event: any){
    this.inputChange.emit(event.target.value)
  }

}
