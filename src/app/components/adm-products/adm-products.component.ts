import { Component , OnInit} from '@angular/core';

import { ProductServiceService } from '../../service/product/product-service.service';
import { Product } from '../../model/product';
import { CommonModule } from '@angular/common';


import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavComponent } from '../nav/nav.component';
import { UserServiceService } from '../../service/user/user-service.service';
import { Router } from '@angular/router';


function formatNumberToCurrency(number: number): string {
  let formattedNumber = number.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });
  formattedNumber = formattedNumber.replace('CLP', '').trim();
  return formattedNumber;
}
/**
 * @description
 * Componente para la administracion de productos.
 * 
 * Este componente muestra una lista de todos los productos y tambien el formulario para agregar
 * un producto nuevo.
 *  
 * @usageNotes
 * 1.- Cuando iniciamos el componente obtenemos todos los productos desde el servicio.
 * 2.- con el mismo formulario podemos crear un nuevo producto o actualizar uno existente.
 * 3.- para actualizar un producto debemos apretar el botón "VER" y se cargará nuestro producto en el formulario y se habilitará un botón "ACTUALIZAR"
 */

@Component({
  selector: 'app-adm-products',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavComponent],
  templateUrl: './adm-products.component.html',
  styleUrl: './adm-products.component.css'
})
export class AdmProductsComponent {


  productoForm: FormGroup;

  modificar: boolean = false;

  //Función para formatear números
  formatNumberToCurrency = formatNumberToCurrency;
  productos: Product[] = [];

  ngOnInit(): void {
    this.getProductos();
  }

  constructor(
    private productService: ProductServiceService, 
    private fb : FormBuilder,
    private userService:UserServiceService,
    private router : Router
  ) { 

    if(this.userService.getUserLog().username.length === 0 ){
      this.router.navigate(['/login']);
    }
    this.productoForm = this.fb.group({
      id:[''],
      nombre:['',Validators.required],
      descripcion:['',Validators.required],
      valor:['',Validators.required],
      img:['',Validators.required]
    })
  }


  getProductos(){
    this.productos = this.productService.getProducts();
  }
  onSubmit(){
    if(this.productoForm.valid){

      if(this.modificar){
        const prod_mod = this.productService.updateProduct(this.productoForm.value);
        if(!prod_mod){
          alert('Error al modificar el registro.');
          return
        }
        alert('Producto: '+prod_mod.nombre+' modificado correctamente.');
        this.getProductos();
        this.limpiarFormularioProducto();
        return
      }

      this.productoForm.get('id')?.setValue(this.productos.length+1, { emitEvent: false });
      
      this.productService.addProduct(this.productoForm.value);

      this.getProductos();
      this.limpiarFormularioProducto();

      // console.log(this.productoForm.value)
    }
  }
  limpiarFormularioProducto(){
    this.productoForm.reset();
  }
  /**
   * 
   * @param {number} id -El id del producto que queremos mostrar en nuestro 
   *                      formulario para actualizar
   */
  mostrarProducto(id:number){

    this.limpiarFormularioProducto();
    let producto = this.productService.getProductByID(id);
    this.productService.id_mod = id;
    if(producto){
      this.modificar = true;
      this.productoForm.patchValue(producto);
    }

  }
}
