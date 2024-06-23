import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { CommonModule } from '@angular/common';
import { UserServiceService } from '../../service/user/user-service.service';
import { User } from '../../model/user';
import { Rol } from '../../model/rol';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NavComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  public rol:Rol = {
    id:0,
    descripcion:'',
  }
  public user : User = {
    id:0,
    nombres:'',
    apellidos:'',
    username:'',
    rol:this.rol,
    pass:'',
    calle:'',
    numeracion:'',
    correo:'',
    fecha_nac:'',
    comuna:''

  };

  profileForm !: FormGroup;

  constructor(
    private userService: UserServiceService,
    private fb : FormBuilder,
    private router: Router
  ){

    if(this.user.username.length === 0){
      this.router.navigate(['/login']);
    }


    this.profileForm = this.fb.group({
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      username: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      pass: ['', [Validators.required]],
      repet_pass: ['', [Validators.required]],
      fecha_nac: ['', [Validators.required]],
      calle: ['', []],
      numeracion: ['', []],
      comuna: ['', []],
    });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    

    this.user = this.userService.getUserLog();

    this.profileForm.patchValue(this.user);
    

  }

  update(){

  }
 


}
