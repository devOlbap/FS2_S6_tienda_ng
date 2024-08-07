import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserServiceService } from '../../service/user/user-service.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../../model/user';


/**
 * @description
 * Este es un componente que muestra un formulario HTML donde se pueden ingresar los datos requeridos para crear un nuevo cliente.
 * Este formulario no sirve para crear administradores o usuarios (funcionarios) de la aplicación.
 * -> Puede crear solo clientes.
 * -> Para crear usuarios(funcionarios) o administradores debe ser desde el menu de administracion de usuarios.
 *  
 * @usageNotes
 * 1.- importa este componente en tu modulo principal
 * 2.- configura el routing para llamar correctamente a este componente.
 * 3.- Este componente lo utilizamos para que usuarios que no existen en nuestra app se puedan registrar como Clientes.
 */


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NavComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  userForm : FormGroup;

  constructor(
    private fb : FormBuilder,
    private userService:UserServiceService,
    private router : Router
  ) { 

    // if(this.userService.getUserLog().username.length === 0 ){
    //   this.router.navigate(['/login']);
    // }

    this.userForm = this.fb.group({
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]],
      correo: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      repet_pass: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      rol: ['', []],
      fecha_nac: ['', [Validators.required]],
      calle: ['', []],
      numeracion: ['', []],
      comuna: ['', []],
    })
  }
  
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.limpiarForm();
  }

  hasAtLeastOneNumber(str: string): boolean {
    const regex = /\d/;
    return regex.test(str);
  }
  isAtLeast15YearsOld(birthDateString: string): boolean {
    const birthDate = new Date(birthDateString);
    if (isNaN(birthDate.getTime())) {
      throw new Error('Fecha de nacimiento no válida');
    }
  
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
  
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
  
    return age >= 15;
  }

  /**
   * Esta función retorna null o undefined ya que el objetivo principal es:
   *  -> utlizando el servicio de usuarios podemos validar si existen usuarios con algunos datos relevantes ingresados en el formulario
   *      como por ejemplo:
   *        > username
   *        > email
   *  -> estos datos tienen que ser unicos en nuestra base de datos ya que con ellos realizamos la validacion para la recuperacion de contraseña.
   *  -> validamos que las contraseñas ingresadas sean válidas e iguales.
   *  -> una vez realizadas y aprobadas todas las validaciones podemos generar el nuevo registro de usuario.
   *  -> y lo guardamos utilizando el mismo servicio de usuarios.
   * 
   * @returns -> Null | undefined
   */
  submit(){
    if(!this.userForm.valid){
      return
    }

    let username = this.userForm.get('username')?.value;
    let pass = this.userForm.get('pass')?.value;
    let repet_pass = this.userForm.get('repet_pass')?.value;

    if(username.trim().length ==0){
      alert('debe indicar un nombre de usuario.');
      return
    }

    let user = this.userService.getUserByUsername(username);

    if(user){
      alert('Ya existe un usuario con el nombre de usuario: '+user.username+'.');
      return
    }

    user = this.userService.getUserByEmail(this.userForm.get('correo')?.value.trim());

    if(user){
      alert('Ya existe un usuario con el correo : '+user.correo+'.');
      return
    }

    if(pass.trim().length == 0 || repet_pass.trim().length == 0){
      alert('Debe indicar la contraseña y repetirla');
      return
    }

    if(pass.trim() !== repet_pass.trim()){
      alert('Las contraseñas deben ser iguales.');
      return
    }

    if(pass.trim().length<8 && repet_pass.trim().length<8){
      alert('Las contraseñas deben tener un minimo de 8 caracteres.');
      return
    }
    if(!this.hasAtLeastOneNumber(pass) && !this.hasAtLeastOneNumber(repet_pass)){
      alert('Las contraseñas deben tener al menos un número.');
      return
    }

    if(!this.isAtLeast15YearsOld(this.userForm.get('fecha_nac')?.value)){
      alert('Debe ser al menos mayor de 15 años de edad!.');
      return
    }

    let rol = this.userService.getRolById(3); // id cliente
    if(rol){
      const n_user :User = {
        id:this.userService.getUsuarios().length+1,
        nombres:this.userForm.get('nombres')?.value,
        apellidos:this.userForm.get('apellidos')?.value,
        username:this.userForm.get('username')?.value,
        rol: rol.id,
        pass:this.userForm.get('pass')?.value,
        calle:this.userForm.get('calle')?.value,
        numeracion:this.userForm.get('numeracion')?.value,
        correo:this.userForm.get('correo')?.value,
        fecha_nac:this.userForm.get('fecha_nac')?.value,
        comuna:this.userForm.get('comuna')?.value
      }
      this.userService.addUser(n_user);
      // this.userService.userLog = n_user;
      // this.userService.rolLog = rol;

      alert('Usuario: '+n_user.nombres+' '+n_user.apellidos+' creado exitosamente!');
      this.limpiarForm();
      this.router.navigate(['/login'])
      return
    }
  }

  /**
   * Funcion que permite limpiar el formulario utilizado para la creacion de nuevos usuarios.
   */
  limpiarForm(){
    this.userForm.reset();
  }
}
