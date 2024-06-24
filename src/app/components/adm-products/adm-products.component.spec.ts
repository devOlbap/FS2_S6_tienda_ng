import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmProductsComponent } from './adm-products.component';

describe('AdmProductsComponent', () => {
  let component: AdmProductsComponent;
  let fixture: ComponentFixture<AdmProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // it('should create a new product',()=>{
  //   component.productoForm.setValue({
  //     id:5,
  //     nombre:'Posa vasos',
  //     descripcion:'Posa vasos impreso en 3d',
  //     valor:'15990',
  //     img:'posa_vasos.jpg'
  //   });
  //   expect(component.onSubmit());
  // });
  it('should show all products',()=>{
    component.ngOnInit();
    component.getProductos();
    expect(component.productos.length).toBeGreaterThan(1);
  })
});
