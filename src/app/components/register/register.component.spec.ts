import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize the form correctly',()=>{
    expect(component.userForm.valid).toBeFalsy();
  });
  it('should set response after submitting the form',()=>{
    component.userForm.setValue({
      nombres: 'Pablo',
      apellidos: 'Garrido',
      username: 'fco',
      correo: 'fco@gmail.com',
      pass: 'Pass1010!',
      repet_pass: 'Pass1010!',
      rol: {id:1,descripcion:'Administrador'},
      fecha_nac: '1995-06-06',
      calle: '',
      numeracion: '',
      comuna: '',
    });
    component.submit();
    expect(component.userForm.valid)
  });
});
