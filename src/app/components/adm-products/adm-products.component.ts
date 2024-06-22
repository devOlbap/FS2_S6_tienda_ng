import { Component , OnInit} from '@angular/core';

import { ProductServiceService } from '../../service/product/product-service.service';
import { Product } from '../../model/product';
import { CommonModule } from '@angular/common';


import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavComponent } from '../nav/nav.component';


function formatNumberToCurrency(number: number): string {
  let formattedNumber = number.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });
  formattedNumber = formattedNumber.replace('CLP', '').trim();
  return formattedNumber;
}


@Component({
  selector: 'app-adm-products',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavComponent],
  templateUrl: './adm-products.component.html',
  styleUrl: './adm-products.component.css'
})
export class AdmProductsComponent {


  productoForm: FormGroup;


  //Función para formatear números
  formatNumberToCurrency = formatNumberToCurrency;
  productos: Product[] = [];

  ngOnInit(): void {
    this.productos = this.productService.getProducts();
  }

  constructor(private productService: ProductServiceService, private fb : FormBuilder) { 
    this.productoForm = this.fb.group({
      id:[''],
      nombre:['',Validators.required],
      descripcion:['',Validators.required],
      valor:['',Validators.required],
      img:['',Validators.required]
    })
  }

  onSubmit(){
    if(this.productoForm.valid){

      this.productoForm.get('id')?.setValue(this.productos.length+1, { emitEvent: false });
      
      this.productService.addProduct(this.productoForm.value);
      // console.log(this.productoForm.value)
    }
  }
  limpiarFormularioProducto(){
    this.productoForm.reset();
  }
}
