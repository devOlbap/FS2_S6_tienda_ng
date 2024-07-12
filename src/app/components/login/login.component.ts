import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { FormBuilder, FormGroup , ReactiveFormsModule, Validators} from '@angular/forms';
import { UserServiceService } from '../../service/user/user-service.service';
import { Router } from '@angular/router';
import { NavComponent } from '../nav/nav.component';

import { User } from '../../model/user';
import { Observable } from 'rxjs';
import { Rol } from '../../model/rol';

/**
 * @description
 * Este es un componente para realizar el inicio de sesión de usuario a nuestra app.
 * Los datos requeridos son :
 *  @param {string} username -> referenciando al nombre de usuario.
 *  @param {string} password -> referenciando a la contraseña que ingresó el usuario al momento de registrarse.
 *  
 * @usageNotes
 * 1.- importa este componente en tu modulo principal
 * 2.- configura el routing para llamar correctamente a este componente.
 * 3.- Este componente muestra un formulario html con dos input.
 *      donde puedes ingresar tu nombre de usuario y contraseña.
 */

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  /**
   * Utilizado para el ingreso de las credenciales del usuario en la funcion login().
   */
  loginForm !:FormGroup;

  userLog:User =  {
    id:0,
    nombres:'',
    apellidos:'',
    username:'',
    rol:0,
    pass:'',
    calle:'',
    numeracion:'',
    correo:'',
    fecha_nac:'',
    comuna:''

  };

  users :User[] = [];
  roles :Rol[]=[];

  constructor(
    private fb: FormBuilder, 
    private userService: UserServiceService,
    private router:Router
  ){}

  ngOnInit(): void {
    
    this.loginForm = this.fb.group({
      username:['',[Validators.required, Validators.minLength(4), Validators.maxLength(16)]],
      password:['',[Validators.required, Validators.minLength(8), Validators.maxLength(16)]]
    })

  }
  /**
   * Metodo para llamar al servicio de usuarios y preguntar si el usuario ingresó correctamente sus credenciales.
   * utiliza el loginForm
   */
  login() {

    if(this.loginForm.valid){
      // const user = this.userService.login(this.loginForm.get('username')?.value, this.loginForm.get('password')?.value);

      let username = this.loginForm.get('username')?.value.trim().length > 0 ? this.loginForm.get('username')?.value.trim() : false;

      let password = this.loginForm.get('password')?.value.trim().length > 0 ? this.loginForm.get('password')?.value.trim() : false;

      if(!username){
        alert('Falta indicar el nombre de usuario.');
        return
      }
      if(!password){
        alert('Falta indicar la contraseña.');
        return
      }

      let user = this.userService.login(username,password);

      if(user?.rol){
        let rol = this.userService.getRolById(user?.rol);
        if(rol){
          this.userService.rolLog = rol;
        }        
      }
      if (user) {
        this.userLog = user;
        this.router.navigate(['/home']);
        alert('Inicio de sesión exitoso: '+ user.nombres+' '+user.apellidos);
        this.userService.userLog = user;
      } else {
        alert('Credenciales inválidas. Inicio de sesión fallido.');
      }
    }


    
  }

}
