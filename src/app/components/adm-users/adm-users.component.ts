import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserServiceService } from '../../service/user/user-service.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../../model/user';
import { Rol } from '../../model/rol';

/**
 * @description
 * Este es un modulo de administracion de usuarios.
 * En este modulo podemos crear un nuevo usuario asignandole cualquiera de los roles que tenemos disponibles 
 * 
 * @usageNotes
 * 1.- importa este componente en tu modulo principal
 * 2.- configura el routing para llamar correctamente a este componente.
 * 3.- en este componente puedes crear nuevos usuarios.
 * 4.- Puedes ver una lista del universo de usuarios.
 */
@Component({
  selector: 'app-adm-users',
  standalone: true,
  imports: [NavComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './adm-users.component.html',
  styleUrl: './adm-users.component.css'
})
export class AdmUsersComponent {

  usuarios : User[]=[];
  roles : Rol[]=[];

  modificar: boolean = false;
  userForm : FormGroup;

  /**
   * En el constructor validamos si existe algun usuario loggeado..
   *  -> de lo contrario redirigimos a login.
   * - Generamos el objeto de formulario de usuarios.
   * 
   * @param fb -> FormBuilder para crear el objeto formulario e indicar los campos requeridos.
   * @param userService -> Servicio de usuarios que nos permite obtener, modificar y agregar usuarios.
   * @param router -> Router lo utilizamos para redirigir al componente login cuando no tenemos un usuario loggeado.
   */
  constructor(
    private fb : FormBuilder,
    private userService:UserServiceService,
    private router : Router
  ) { 

    if(this.userService.getUserLog().username.length === 0 ){
      this.router.navigate(['/login']);
    }

    this.userForm = this.fb.group({
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      username: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      pass: ['', [Validators.required]],
      rolcito: ['', [Validators.required]],
      fecha_nac: ['', []],
      calle: ['', []],
      numeracion: ['', []],
      comuna: ['', []],
      role: ['', []],

    })


    
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getUsers();
    this.getRoles();
  }
  /**
   * Funcion que obtiene todo el universo de usuarios.
   */
  getUsers(){
    this.usuarios = this.userService.getUsuarios();
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
  hasAtLeastOneNumber(str: string): boolean {
    const regex = /\d/;
    return regex.test(str);
  }


  /**
   * Funcion que obtiene todos los roles disponibles para su seleccion.
   */
  getRoles(){
    this.roles = this.userService.getRoles();
  }
  /**
   * Esta funcion obtiene y valida toda la informacion ingresada en el formulario de usuarios.
   * si cumple con todas las validaciones utilizamos el servicio de usuarios para poder agregar o modificar 
   * el usuario nuevo o un usuario seleccionado respectivamente.
   * 
   * @returns null | undefined
   */
  submit(){
    let username = this.userForm.get('username')?.value;
    let pass = this.userForm.get('pass')?.value;

    if(username.trim().length ==0){
      alert('debe indicar un nombre de usuario.');
      return
    }

    if(pass.trim().length == 0 ){
      alert('Debe indicar la contraseña.');
      return
    }

    if(pass.trim().length < 8){
      alert('La contraseña deben tener un minimo de 8 caracteres.')
      return
    }
    if(!this.hasAtLeastOneNumber(pass)){
      alert('La contraseña deben tener al menos un número.')
      return
    }
    if(!this.isAtLeast15YearsOld(this.userForm.get('fecha_nac')?.value)){
      alert('Debe ser mayor a 15 años.!');
      return
    }
    
    let n_rol = this.roles.find(rol_e => rol_e.id == this.userForm.get('rolcito')?.value );

    if(n_rol){
      const n_user :User = {
        id:this.userService.getUsuarios().length+1,
        nombres:this.userForm.get('nombres')?.value,
        apellidos:this.userForm.get('apellidos')?.value,
        username:username,
        rol: n_rol.id,
        pass:pass,
        calle:this.userForm.get('calle')?.value,
        numeracion:this.userForm.get('numeracion')?.value,
        correo:this.userForm.get('correo')?.value,
        fecha_nac:this.userForm.get('fecha_nac')?.value,
        comuna:this.userForm.get('comuna')?.value
      }

      if(this.modificar){
        this.userService.updateUser(n_user);
        alert('Usuario: '+n_user.nombres+' '+n_user.apellidos+' modificado exitosamente!.');
        this.getUsers();
        this.limpiarForm();
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

      this.userService.addUser(n_user);
      alert('Usuario: '+n_user.nombres+' '+n_user.apellidos+' con ROL: '+n_rol.descripcion+'. Fue creado exitosamente!.');
      this.getUsers();
      this.limpiarForm();
      return
    }
    
    alert('Error debe seleccionar rol.');
    return
  }

  limpiarForm(){
    this.userForm.reset();
    this.userForm.get('username')?.enable();
    this.modificar = false;
  }

  getRolDescripcionById(id:number){
    return this.userService.getRolById(id)?.descripcion;
  }
  
  /**
   * Esta funcion nos permite recibir por parámetro el identificador el usuario.
   * Validar si es que existe un usuario con el identificador y mostrar la información 
   * referida a este objeto en el formulario HTML.
   * 
   * @param id -> Identificador que hace referencia al usuario que se requiere ver el Detalle.
   */
  mostrarUser(id:number){

    let user = this.userService.getUserById(id);

    this.limpiarForm();
    if(user){
      this.modificar = true;

      let rol = this.userService.getRolById(user.rol);


      this.userForm.patchValue({
        nombres: user.nombres,
        apellidos: user.apellidos,
        username: user.username,
        correo: user.correo,
        pass: user.pass,
        rolcito: rol?rol.id:0,
        fecha_nac: user.fecha_nac,
        calle: user.calle,
        numeracion: user.numeracion,
        comuna: user.comuna,
        role: '',
      })

      this.userForm.get('username')?.disable();
      // this.userForm
    }

  }
  delUser(id:number){

    const usr = this.userService.getUserById(id);

    if(!usr){
      alert('No existe usuario con el identificador: '+id);
      return
    }

    if(confirm('¿Estás seguro que deseas eliminar a: '+usr.nombres+' '+usr.apellidos+' ?')){
      this.userService.deleteUser(id);
      
      this.getUsers();
      alert('Usuario: '+usr.nombres+' '+usr.apellidos +'. Eliminado correctamente!.');
    }
    return
  }
}
