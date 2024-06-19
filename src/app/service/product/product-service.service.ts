import { Injectable } from '@angular/core';
import { Product } from '../../model/product';




@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  private products: Product[]=[
    {
      id:1,
      nombre:'Iphone 6 Case',
      descripcion:'phone case" para teléfono iphone',
      valor:5000,
      img:"carcasa_iphone_6.jpg"
    },
    {
      id:2,
      nombre:'Thanos',
      descripcion:'Articulo impreso en 3D con filamento ABS.',
      valor:9000,
      img:"thanos_imp_3d.jpg"
    },
    {
      id:3,
      nombre:'Taladro',
      descripcion:'Taladro percutor uso hogar marca TOTAL. Garantía 6 meses',
      valor:29990,
      img:"taladro.webp"
    },
    {
      id:4,
      nombre:'Soporte teléfono',
      descripcion:'Soporte impreso en 3D con filamento ABS.',
      valor:7990,
      img:"soporte_telefono.jpg"
    }
  ]

  private carrito : Product[]=[];

  constructor() { }

  getProducts():Product[]{
    return this.products;
  }
  addProduct(product:Product){
    this.products.push(product);
  }
  getProductByID(id:number):Product|undefined{
    return this.products.find(prod => prod.id === id);
  }
  deleteProduct(id:number):void{
    this.products = this.products.filter(prod => prod.id !== id);
  }


  getCarrito():Product[]{
    return this.carrito;
  }
  addCarrito(product:Product){
    this.carrito.push(product);
  }
  deleteProductCarrito(id:number):void{
    this.carrito = this.carrito.filter(prod => prod.id !== id);
  }
  cleanCarrito():void{
    this.carrito = [];
  }

}
