import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UserServiceService } from '../../service/user/user-service.service';
import { User } from '../../model/user';
import { Rol } from '../../model/rol';
import { ProductServiceService } from '../../service/product/product-service.service';


/**
 * @description
 * Este es un componente que muestra el menu completo de nuestra aplicación.
 * Es llamado en cada componente. esto por que necesitamos validar en cada componente el usuario que esta loggeado.
 *  
 * @usageNotes
 * 1.- importa este componente en tu modulo principal.
 * 2.- muestra el componente utilizando el selector <app-nav> en el modulo principal.
 * 3.- puedes visualizar el menú en cada componente donde lo importes.
 */



@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  public rol:Rol = {
    id:0,
    descripcion:'',
  }
  public user : User = {
    id:0,
    nombres:'',
    apellidos:'',
    username:'',
    rol:this.rol,
    pass:'',
    calle:'',
    numeracion:'',
    correo:'',
    fecha_nac:'',
    comuna:''

  };
  /**
   * 
   * @param userService -> servicio de usuarios donde obtenemos metodos para agregar, modificar y listar usuarios.
   * @param productService -> servicio de productos donde obtenemos metodos para agregar, modificar y listar productos.
   */
  constructor(
    private userService: UserServiceService,
    private productService: ProductServiceService
  ){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.user = this.userService.getUserLog();
    
  }
  /**
   * metodo que es llamado por el botón "CERRAR SESION" del menú.
   * objetivo principal es eliminar el usuario de la sesion en el servicio de usuarios.
   * y limpiar el carrito en el servicio de productos.
   */
  logout() {
    // Lógica para cerrar sesión
    this.userService.logout();
    this.productService.cleanCarrito();
    // Redirigir a la página de inicio de sesión
  }
  

}
