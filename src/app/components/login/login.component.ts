import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { FormBuilder, FormGroup , ReactiveFormsModule, Validators} from '@angular/forms';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm !:FormGroup;

  constructor(private fb: FormBuilder){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loginForm = this.fb.group({
      username:['',Validators.required],
      password:['',[Validators.required,Validators.email]]
    })
    
  }

  login(){
    if(this.loginForm.valid){
      console.log('Formulario valido:'+ this.loginForm.get('username')!.value );
    }
  }

}
