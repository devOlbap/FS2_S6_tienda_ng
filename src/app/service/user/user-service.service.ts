import { Injectable } from '@angular/core';

import { User } from '../../model/user';
import { Rol } from '../../model/rol';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
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
      fecha_nac:'06-04-1995'
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
      fecha_nac:'04-04-1995'
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
      fecha_nac:'06-04-1995'
    },
  ];

  constructor() { }

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
}
