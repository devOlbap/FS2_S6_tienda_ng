import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { CommonModule } from '@angular/common';
import { UserServiceService } from '../../service/user/user-service.service';
import { User } from '../../model/user';
import { Rol } from '../../model/rol';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';



/**
 * @description
 * Este es un componente que muestra un formulario HTML donde se visualizan los datos personales del usuario que inició sesión.
 * Utilizamos este componente solo para la actualizacion de informacion personal del mismo usuario.
 *  
 * @usageNotes
 * 1.- importa este componente en tu modulo principal
 * 2.- configura el routing para llamar correctamente a este componente.
 * 3.- Este componente es capaz de actualizar los datos personales del usuario loggeado.
 */


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NavComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  public rol:Rol = {
    id:0,
    descripcion:'',
  }
  public user : User = {
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

  public thisisfalse :boolean = false;

  profileForm !: FormGroup;

  /**
   * 
   * @param userService -> Servicio de usuario: Utilizamos el servicio para obtener todos los datos el usuario loggeado.
   * @param fb -> FormBuilder lo utilizamos para crear el objeto del formulario del usuario.
   * @param router -> Router lo utilizamos para redirigir al login en caso de que no exista usuario loggeado.
   */
  constructor(
    private userService: UserServiceService,
    private fb : FormBuilder,
    private router: Router
  ){

  

    this.profileForm = this.fb.group({
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      username: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      pass: ['', [Validators.required]],
      repet_pass: ['', [Validators.required]],
      fecha_nac: ['', [Validators.required]],
      calle: ['', []],
      numeracion: ['', []],
      comuna: ['', []],
      rol: ['', []],

    });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.


    this.user = this.userService.getUserLog();
    this.rol = this.userService.getRolUserLog();


    this.profileForm.patchValue(this.user);
    this.profileForm.get('username')?.disable();
    this.profileForm.get('rol')?.disable();
    this.profileForm.get('rol')?.setValue(this.rol.descripcion);

    
    if(this.user.username.length === 0){
      this.router.navigate(['/login']);
    }
    

  }
  /**
   * La función principal de este metodo:
   *  -> Utilizamos el servicio de usuarios para actualizar los datos del usuario loggeado.
   *  -> Validamos que el usuario loggeado exista en nuestra base de datos de usuarios.
   * 
   * @returns -> Retorna NULL | undefined
   */
  update(){
    this.profileForm.get('username')?.enable();
    this.profileForm.get('rol')?.enable();
    this.profileForm.get('rol')?.setValue(this.rol.id);

    let form : User = this.profileForm.value;

    this.profileForm.get('username')?.disable();
    this.profileForm.get('rol')?.disable();

    // console.log(form)

    const res = this.userService.updateUser(form);

    if(res !== undefined){

      this.user = res;

      alert('Usuario actualizado correctamente');

      this.profileForm.reset();
  
      this.profileForm.patchValue(this.user);
      this.profileForm.get('rol')?.disable();
      this.profileForm.get('rol')?.setValue(this.rol.descripcion);
      return
    }
    alert('Error al actualizar');
    return
  }
  /**
   * Funcion que permite limpiar el formulario utilizado para la creacion de nuevos usuarios.
   */
  limpiarForm(){
    this.profileForm.reset();
  }


}
