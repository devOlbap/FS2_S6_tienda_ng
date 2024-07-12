import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  //
  it("should not set userLog before submitting the form.",()=>{
    component.loginForm.setValue({username:'adm',password:'123'});
    component.login();
    expect(window.alert).toHaveBeenCalledWith('Credenciales inválidas. Inicio de sesión fallido.');
  })


});
