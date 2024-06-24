import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserServiceService } from '../../service/user/user-service.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../../model/user';
import { Rol } from '../../model/rol';


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

  getUsers(){
    this.usuarios = this.userService.getUsers();
  }
  getRoles(){
    this.roles = this.userService.getRoles();
  }

  submit(){
    
    let n_rol = this.roles.find(rol_e => rol_e.id == this.userForm.get('rolcito')?.value );

    if(n_rol){
      const n_user :User = {
        id:this.userService.getUsers().length+1,
        nombres:this.userForm.get('nombres')?.value,
        apellidos:this.userForm.get('apellidos')?.value,
        username:this.userForm.get('username')?.value,
        rol: n_rol,
        pass:this.userForm.get('pass')?.value,
        calle:this.userForm.get('calle')?.value,
        numeracion:this.userForm.get('numeracion')?.value,
        correo:this.userForm.get('correo')?.value,
        fecha_nac:this.userForm.get('fecha_nac')?.value,
        comuna:this.userForm.get('comuna')?.value
      }

      if(this.modificar){
        this.userService.updateUser(n_user);
        alert('Usuario: '+n_user.nombres+' '+n_user.apellidos+' con ROL: '+n_user.rol.descripcion+' modificado exitosamente!.');
        this.getUsers();
        this.limpiarForm();
        return
      }
      this.userService.addUser(n_user);
      alert('Usuario: '+n_user.nombres+' '+n_user.apellidos+' con ROL: '+n_user.rol.descripcion+' creado exitosamente!.');
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
  mostrarUser(id:number){

    let user = this.userService.getUserById(id);

    this.limpiarForm();
    if(user){
      this.modificar = true;

      this.userForm.patchValue({
        nombres: user.nombres,
        apellidos: user.apellidos,
        username: user.username,
        correo: user.correo,
        pass: user.pass,
        rolcito: user.rol.id,
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
}
