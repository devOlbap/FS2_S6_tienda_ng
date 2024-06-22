import { Component } from '@angular/core';

import { ProductServiceService } from '../../service/product/product-service.service';

import { Product } from '../../model/product';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NavComponent } from '../nav/nav.component';
import { Router } from '@angular/router';

function formatNumberToCurrency(number: number): string {
  let formattedNumber = number.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });
  formattedNumber = formattedNumber.replace('CLP', '').trim();
  return formattedNumber;
}


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ CommonModule, NavComponent, NgOptimizedImage],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {


  //Función para formatear números
  formatNumberToCurrency = formatNumberToCurrency;
  productos: Product[] = [];

  

  constructor(
    private productService: ProductServiceService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.productos = this.productService.getProducts();
  }

  isInCart(id:number){
    return this.productService.getCarrito().some(item=> item.id === id);
  }

  addToCart(id:number){
    if(!id){
      alert('falta seleccionar el producto');
    }
    let producto = this.productos.find(prod => prod.id === id);

    if(producto){
      this.productService.addCarrito(producto);
      alert('Producto: '+producto.nombre+' Agregado al carrito!');
      this.router.navigate(['/cart']);

      return
    }
    alert('No se encontró producto');
    return
  }
  viewCart(){
    this.router.navigate(['/cart']);
  }
}
