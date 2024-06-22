import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { Product } from '../../model/product';
import { ProductServiceService } from '../../service/product/product-service.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NavComponent, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  productos : Product [] =[];

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

  

}
