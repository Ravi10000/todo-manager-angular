import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CustomInputComponent } from '../custom-input/custom-input.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, CustomInputComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
