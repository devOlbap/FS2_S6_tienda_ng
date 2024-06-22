import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { FormBuilder, FormGroup , ReactiveFormsModule, Validators} from '@angular/forms';
import { UserServiceService } from '../../service/user/user-service.service';
import { Router } from '@angular/router';
import { NavComponent } from '../nav/nav.component';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm !:FormGroup;

  constructor(
    private fb: FormBuilder, 
    private userService: UserServiceService,
    private router:Router
  ){}

  ngOnInit(): void {
    
    this.loginForm = this.fb.group({
      username:['',Validators.required],
      password:['',[Validators.required, Validators.minLength(8)]]
    })
    
  }

  login() {

    if(this.loginForm.valid){
      const user = this.userService.login(this.loginForm.get('username')?.value, this.loginForm.get('password')?.value);
      if (user) {
        
        this.router.navigate(['/home']);
        alert('Inicio de sesión exitoso: '+ user.nombres+' '+user.apellidos);
      } else {
        alert('Credenciales inválidas. Inicio de sesión fallido.');
      }
    }


    
  }

}
