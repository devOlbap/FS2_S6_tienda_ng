import { Component , OnInit} from '@angular/core';

import { ProductServiceService } from '../../service/product/product-service.service';
import { Product } from '../../model/product';
import { CommonModule } from '@angular/common';


function formatNumberToCurrency(number: number): string {
  let formattedNumber = number.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });
  formattedNumber = formattedNumber.replace('CLP', '').trim();
  return formattedNumber;
}


@Component({
  selector: 'app-adm-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './adm-products.component.html',
  styleUrl: './adm-products.component.css'
})
export class AdmProductsComponent {
  //Función para formatear números
  formatNumberToCurrency = formatNumberToCurrency;
  productos: Product[] = [];

  constructor(private productService: ProductServiceService) { }

  ngOnInit(): void {
    this.productos = this.productService.getProducts();
  }

}
