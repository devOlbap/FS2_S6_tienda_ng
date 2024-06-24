import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmUsersComponent } from './adm-users.component';

describe('AdmUsersComponent', () => {
  let component: AdmUsersComponent;
  let fixture: ComponentFixture<AdmUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should show all users',()=>{
    component.ngOnInit();
    expect(component.usuarios.length>1);
  })
  it('should create a new user',()=>{
    component.ngOnInit();
    component.userForm.setValue({
      nombres: 'Pablo',
      apellidos: 'Garrido',
      username: 'fco',
      correo: 'fco@gmail.com',
      pass: 'Pass1010!',
      repet_pass: 'Pass1010!',
      rol: {id:1,descripcion:'Administrador'},
      fecha_nac: '1995-06-06',
      calle: 'Av el manzano',
      numeracion: '56446',
      comuna: 'Santiago',
    });
    component.submit()
    expect(component.getUsers());
  });
  it('should get all roles that exists',()=>{
    component.ngOnInit();
    expect(component.roles.length>1);
  })
});
