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

/**
 * @description
 * Este es un componente muestra una vista para todo usuario (conocido / desconocido) de nuestra aplicación.
 * muestra el universo de productos disponibles para agregar al carrito de cada usuario.
 *  
 * @usageNotes
 * 1.- importa este componente en tu modulo principal
 * 2.- configura el routing para llamar correctamente a este componente.
 * 3.- Este componente muestra un HTML con una grilla que contiene toda la informacion relevante 
 *      de cada producto 
 */

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

  
  /**
   * 
   * @param productService -> Servicio de productos para obtener todos los productos disponibles para la venta.
   * @param router -> Utilizamos el objeto router para redirigir al carrito cada vez que agregamos un producto al carrito.
   */
  constructor(
    private productService: ProductServiceService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.productos = this.productService.getProducts();
  }
  /**
   * Esta función llama al servicio de productos para preguntar si el producto seleccionado existe en el carrito.
   * 
   * @param id -> identificador del producto 
   * @returns -> Retorna un objeto de tipo producto cuando el producto se encuentra en el carrito.
   */
  isInCart(id:number){
    return this.productService.getCarrito().some(item=> item.id === id);
  }
  /**
   * 
   * @param id -> identificador del producto seleccionado para agregar al carrito
   * @returns -> null | undefined ( ya que la funcion principal es redirigir al carrito cuando se agrega un producto.)
   */
  addToCart(id:number){
    if(!id){
      alert('falta seleccionar el producto');
    }
    let producto = this.productos.find(prod => prod.id === id);

    if(producto){
      this.productService.addCarrito(producto);
      alert('Producto: '+producto.nombre+' Agregado al carrito!');
      // this.router.navigate(['/cart']);
      this.viewCart();
      return
    }
    alert('No se encontró producto');
    return
  }
  viewCart(){
    this.router.navigate(['/cart']);
  }
}
