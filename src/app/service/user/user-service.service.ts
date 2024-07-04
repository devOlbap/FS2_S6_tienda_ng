import { Injectable } from '@angular/core';

import { User } from '../../model/user';
import { Rol } from '../../model/rol';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {


  httpOptions = {
    headers : new HttpHeaders({
      "Content-Type":"application/json",
      "Authorization":"Bearer ce572890-912a-4095-9aa8-f36156faf398"
    })
  }

  private usuariosURL = "/api/v0/b/tienda-1c239.appspot.com/o/usuarios.json?alt=media&token=ce572890-912a-4095-9aa8-f36156faf398";

  
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
  private roles: Rol[] = [];

  private users: User[] = [];


  constructor(private router: Router, private http : HttpClient) { }

  
  getJSONdata(): Observable<User[]> {
    return this.http.get<User[]>(this.usuariosURL);
  }



  updatePassword(username: string, newPassword: string): boolean {
    const userIndex = this.users.findIndex(user => user.username === username);
    if (userIndex !== -1) {
      this.users[userIndex].pass = newPassword;
      return true;
    }
    return false;
  }

  getUserByUsername(username:string):User| null{
    const user = this.users.find(user=> user.username === username);
    if(user){
      return user
    }
    return null;

  }
  getUserByEmail(correo:string){
    const user = this.users.find(user=> user.correo === correo);
    if(user){
      return user
    }
    return null;
  }

  getRolById(id:number){
    let rol = this.roles.find(rol => rol.id === id);
    if(rol){
      return rol
    }
    return null
  }

  // getUsers(): User[] {
  //   return this.users;
  // }

  getUsers(): Observable<User[]> {
    return this.getJSONdata().pipe(
      map(usrs => {
        this.users = usrs;
        return usrs;
      })
    );
  }

  getUsuarios(){
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
