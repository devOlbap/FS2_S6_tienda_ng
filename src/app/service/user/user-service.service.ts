import { Injectable } from '@angular/core';

import { User } from '../../model/user';
import { Rol } from '../../model/rol';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  
  private rolLog:Rol = {
    id:0,
    descripcion:'',
  }

  public userLog : User = {
    id:0,
    nombres:'',
    apellidos:'',
    username:'',
    rol:this.rolLog,
    pass:'',
    calle:'',
    numeracion:'',
    correo:'',
    fecha_nac:'',
    comuna:''

  };
  private roles: Rol[] = [
    { id: 1, descripcion: 'Administrador' },
    { id: 2, descripcion: 'Usuario' },
    { id: 3, descripcion: 'Cliente' }
  ];

  private users: User[] = [
    { 
      id: 1, 
      nombres: 'Pablo', 
      apellidos:'Garrido Cid',
      correo: 'pa.garrido.cid@gmail.com', 
      rol: this.roles[0],
      username:'admin',
      pass:'Pass1010!',
      calle:'',
      numeracion:'',
      comuna:'',
      fecha_nac:'1995-05-06'
    },
    { 
      id: 2, 
      nombres: 'Javier', 
      apellidos:'Gonzalez',
      correo: 'javier@gmail.com', 
      rol: this.roles[1],
      username:'javiercito',
      pass:'Pass1010!',
      calle:'',
      numeracion:'',
      comuna:'',
      fecha_nac:'1995-05-05'
    },
    { 
      id: 3, 
      nombres: 'Paulina', 
      apellidos:'Pinto',
      correo: 'pauli@gmail.com', 
      rol: this.roles[2],
      username:'pauli',
      pass:'Pass1010!',
      calle:'av el manzano',
      numeracion:'56555',
      comuna:'Las condes',
      fecha_nac:'1995-05-06'
    },
  ];


  constructor(private router: Router) {
    
  }
  updatePassword(username: string, newPassword: string): boolean {
    const userIndex = this.users.findIndex(user => user.username === username);
    if (userIndex !== -1) {
      this.users[userIndex].pass = newPassword;
      return true;
    }
    return false;
  }
  getUsers(): User[] {
    return this.users;
  }

  addUser(user: User): void {
    this.users.push(user);
  }

  getUserById(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }

  getRoles(): Rol[] {
    return this.roles;
  }

  getUserLog():User{
    return this.userLog;
  }

  setUserBlank(){
    this.userLog = {
      id:0,
      nombres:'',
      apellidos:'',
      username:'',
      rol:this.rolLog,
      pass:'',
      calle:'',
      numeracion:'',
      correo:'',
      fecha_nac:'',
      comuna:''
  
    }
  }
  login(username: string, password: string): User | undefined {
    const foundUser = this.users.find(user => user.username === username && user.pass === password);
    if (foundUser) {
      this.userLog = foundUser;
      return foundUser;
    }
    return undefined; 
  }
  updateUser(n_user: User): User | undefined {

    const userIndex = this.users.findIndex(user => user.username === n_user.username);

    if (userIndex !== -1) {
    
      this.users[userIndex].nombres   = n_user.nombres;
      this.users[userIndex].apellidos = n_user.apellidos;
      this.users[userIndex].username  = n_user.username;
      // this.users[userIndex].rol       = n_user.rol;
      this.users[userIndex].pass      = n_user.pass;
      this.users[userIndex].calle     = n_user.calle;
      this.users[userIndex].numeracion = n_user.numeracion;
      this.users[userIndex].correo    = n_user.correo;
      this.users[userIndex].fecha_nac = n_user.fecha_nac;
      this.users[userIndex].comuna    = n_user.comuna;

      let user = this.users[userIndex];
      return user;
    }
    return undefined;
  }
  logout(){
    this.setUserBlank();
    this.router.navigate(['/login'])
  }

}
