import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { Product } from '../../model/product';
import { ProductServiceService } from '../../service/product/product-service.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

function formatNumberToCurrency(number: number): string {
  let formattedNumber = number.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });
  formattedNumber = formattedNumber.replace('CLP', '').trim();
  return formattedNumber;
}

/**
 * @description
 * Este es un componente para mostrar y mantener el carrito de cada uusuario.
 * una vez cerrada la sesion del usuario se limpia el carrito. 
 * 
 * @usageNotes
 * 1.- importa este componente en tu modulo principal
 * 2.- configura el routing para llamar correctamente a este componente.
 * 3.- en este componente puedes ver todos los productos que seleccionaste para tu carrito.
 * 4.- este componente requiere de los servicios de productos para saber el universo de productos.
 */
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NavComponent, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  productos : Product [] =[];
  //Función para formatear números
  formatNumberToCurrency = formatNumberToCurrency;
  constructor(
    private productService: ProductServiceService,
    private router: Router
  ){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.productos = this.productService.getCarrito();
  }
  quitarProducto(id:number){
    if(this.productos.length ===0){
      return
    }

    this.productService.deleteProductCarrito(id);
    this.productos = this.productService.getCarrito();
    // this.productos = this.productos.filter(producto => producto.id === id);
  }

  backToProducts(){
    this.router.navigate(['/products'])
  }

}
