import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UserServiceService } from '../../service/user/user-service.service';
import { User } from '../../model/user';
import { Rol } from '../../model/rol';
import { ProductServiceService } from '../../service/product/product-service.service';

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

  constructor(
    private userService: UserServiceService,
    private productService: ProductServiceService
  ){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.user = this.userService.getUserLog();
    // console.log(this.user)

    // this.user = this.user;

    // this.userService.userLog$.subscribe(user => {
    //   this.user = user;
    // });
  }
  logout() {
    // Lógica para cerrar sesión
    this.userService.logout();
    this.productService.cleanCarrito();
    // Redirigir a la página de inicio de sesión
  }
  

}
