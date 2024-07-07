import { Injectable } from '@angular/core';
import { Product } from '../../model/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": "Bearer 59eece05-8dd6-4757-97da-76918096b401"
    })
  }

  private productosURL = "/api/v0/b/tienda-1c239.appspot.com/o/productos.json?alt=media&token=59eece05-8dd6-4757-97da-76918096b401";

  id_mod: number = 0;

  private products: Product[] = [];

  private carrito: Product[] = [];

  constructor(private http: HttpClient) { }

  getJSONdata(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productosURL);
  }

  getProducts(): Observable<Product[]> {
    return this.getJSONdata().pipe(
      map(products => {
        this.products = products;
        return products;
      })
    );
  }

  postProductos(lista_productos:any){
    this.http.post(this.productosURL,lista_productos,this.httpOptions)
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



  addProduct(product: Product) {
    this.products.push(product);

    this.postProductos(this.products);
  }

  getProductByID(id: number): Product | undefined {
    return this.products.find(prod => prod.id === id);
  }

  deleteProduct(id: number): void {
    this.products = this.products.filter(prod => prod.id !== id);
    this.postProductos(this.products);
  }

  updateProduct(prod: Product): Product | undefined {
    const prodIndex = this.products.findIndex(producto => producto.id === this.id_mod);

    if (prodIndex !== -1) {
      this.products[prodIndex].valor = prod.valor;
      this.products[prodIndex].nombre = prod.nombre;
      this.products[prodIndex].descripcion = prod.descripcion;
      this.products[prodIndex].img = prod.img;

      let producto = this.products[prodIndex];
      this.id_mod = 0;

      this.postProductos(this.products);

      return producto;
    }
    return undefined;
  }

  getCarrito(): Product[] {
    return this.carrito;
  }

  addCarrito(product: Product) {
    this.carrito.push(product);
  }

  deleteProductCarrito(id: number): void {
    this.carrito = this.carrito.filter(prod => prod.id !== id);
  }

  cleanCarrito(): void {
    this.carrito = [];
  }

}
