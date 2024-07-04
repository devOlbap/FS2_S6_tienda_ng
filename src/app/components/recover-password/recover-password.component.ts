import { Component } from '@angular/core';
import { UserServiceService } from '../../service/user/user-service.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../nav/nav.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recover-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavComponent],
  templateUrl: './recover-password.component.html',
  styleUrl: './recover-password.component.css'
})
export class RecoverPasswordComponent {
  email: string = '';
  loading: boolean = false;
  message: string = '';
  validateForm  !:FormGroup;

  username : string = '';
  recoverPassForm !: FormGroup;

  validateFormbool:boolean = false;


  constructor(
    private userService: UserServiceService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.username = '';
    
    this.validateForm = this.fb.group({
      username:['',Validators.required],
      email:['',[Validators.required, Validators.email]]
    })

    this.recoverPassForm = this.fb.group({
      pass:['',Validators.required]
    })
    
  }
  onSubmitRecover(){
    let password = this.recoverPassForm.get('pass')?.value;

    if(!password){
      alert('Falta indicar la contraseña nueva');
      return
    }
    this.userService.updatePassword(this.username, password);

    const user = this.userService.login(this.username, password);
      if (user) {
        
        this.router.navigate(['/home']);
        alert('Inicio de sesión exitoso: '+ user.nombres+' '+user.apellidos);
      } else {
        alert('Credenciales inválidas. Inicio de sesión fallido.');
      }
  }

  onSubmit() {
    this.username = this.validateForm.get('username')?.value;
    let email = this.validateForm.get('email')?.value;

    if(this.username.trim().length === 0){
      alert('Falta indicar el nombre de usuario (username)');
      return
    }
    if(email.trim().length ===0){
      alert('Falta indicar un Correo.');
      return
    }
    
    const user = this.userService.getUsuarios().find(
      user => user.username === this.username
              && user.correo === email
    )

    if(!user){
      alert('No existe usuario con el nombre de usuario: '+this.username+' y el correo: '+email);
      return
    }

    alert('Usuario validado correctamente.');

    this.validateFormbool = true;
    // setTimeout(() => {

    //   const user = this.userService.getUsers().find(
    //     user => user.username === username
    //             && user.correo === email
    //   )

    //   if(!user){
    //     alert('No existe usuario con el nombre de usuario: '+username+' y el correo: '+email);
    //     return
    //   }

    //   this.message = '';
    //   this.loading = false;
    // }, 2000);
  }
}
