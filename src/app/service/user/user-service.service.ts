import { Injectable } from '@angular/core';

import { User } from '../../model/user';
import { Rol } from '../../model/rol';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../../environment';

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

  private usuariosURL = environment.apiUrl
                    + environment.dominio_app
                    + "o/usuarios.json?"
                    + "alt=media&"
                    + "token="+environment.token_usuarios //token acceso archivo json
  ;

  private rolesURL = environment.apiUrl
                    + environment.dominio_app
                    + "o/roles.json?"
                    + "alt=media&"
                    + "token="+environment.token_roles
  ;
  
  public rolLog:Rol = {
    id:0,
    descripcion:'',
  }

  public userLog : User = {
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
  public roles: Rol[] = [];

  public users: User[] = [];


  constructor(private router: Router, private http : HttpClient) {
    this.getDataRoles().subscribe(
      roles => {
        this.roles =roles;
      }
    )

    this.getDataUsers().subscribe(
      usuarios => {
        this.users = usuarios;
      }
    );
   }

  
  getJSONdataUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usuariosURL);
  }

  getDataUsers(): Observable<User[]> {
    return this.getJSONdataUsers().pipe(
      map(usrs => {
        this.users = usrs;
        return this.users;
      })
    );
  }
  getJSONdataRoles(): Observable<Rol[]> {
    return this.http.get<Rol[]>(this.rolesURL);
  }
  getDataRoles(): Observable<Rol[]> {
    return this.getJSONdataRoles().pipe(
      map(rols => {
        this.roles = rols;
        return this.roles;
      })
    );
  }


  postUsuarios(lista_usrs:any){
    this.http.post(this.usuariosURL,lista_usrs,this.httpOptions)
    .subscribe(
      response =>{
        console.log( 'Actualizado con exito!.');
      },
      error=>{
        console.log( 'Error al actualizar');
      }
    )
    // this.getProducts();

  }

  updatePassword(username: string, newPassword: string): boolean {
    const userIndex = this.users.findIndex(user => user.username === username);
    if (userIndex !== -1) {
      this.users[userIndex].pass = newPassword;
      this.postUsuarios(this.users);
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
    return this.roles.find(rol => rol.id === id) 
  }

  

  getRolUserLog(){
    return this.rolLog;
  }


  getUsuarios(){
    return this.users;
  }

  addUser(user: User): void {
    this.users.push(user);
    this.postUsuarios(this.users);
  }

  deleteUser(id: number): void {
    this.users = this.users.filter(usr => usr.id !== id);
    this.postUsuarios(this.users);
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
    this.rolLog ={
      id:0,
      descripcion:'',
    }
    
    this.userLog = {
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
  
    }
  }
  login(username: string, password: string): User | undefined {


    const foundUser = this.users.find(user => user.username === username && user.pass === password);
    if (foundUser) {
      this.userLog = foundUser;
      let rol;
      if(foundUser.rol){
        rol = this.getRolById(this.userLog.rol);
        if(rol){
          this.rolLog = rol;
        }
      }
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
      this.users[userIndex].rol       = n_user.rol;
      this.users[userIndex].pass      = n_user.pass;
      this.users[userIndex].calle     = n_user.calle;
      this.users[userIndex].numeracion = n_user.numeracion;
      this.users[userIndex].correo    = n_user.correo;
      this.users[userIndex].fecha_nac = n_user.fecha_nac;
      this.users[userIndex].comuna    = n_user.comuna;

      let user = this.users[userIndex];
      this.postUsuarios(this.users);
      return user;
    }
    return undefined;
  }
  logout(){
    this.setUserBlank();
    this.router.navigate(['/login'])
  }

}
