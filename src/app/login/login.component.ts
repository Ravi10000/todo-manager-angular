import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl,Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isAttempted = false;
  formData: FormGroup = new FormGroup({});

  ngOnInit(){
    console.log({is: this.isAttempted});
    
    this.formData = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })

  }
constructor(){}
onSubmit(){
  this.isAttempted = true;
  console.log(this.formData);
}

// toggleAttempted(){
//   this.isAttempted = true;
// }
}
