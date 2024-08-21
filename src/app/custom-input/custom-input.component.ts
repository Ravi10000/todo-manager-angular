import { Component, EventEmitter, Input, Output  } from '@angular/core';

@Component({
  selector: 'app-custom-input',
  standalone: true,
  imports: [],
  templateUrl: './custom-input.component.html',
  styleUrl: './custom-input.component.css'
})
export class CustomInputComponent {
  @Input()
  label: string = "";
  @Input()
  id: string = "";
  @Input()
  type: string = "";
  @Input()
  value: string = "";
  @Output()
  inputChange = new EventEmitter<string>();

onInput(event:any){
  this.inputChange.emit(event.target.value);
}
}
