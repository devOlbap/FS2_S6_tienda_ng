import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { FormBuilder } from '@angular/forms';
import { UserServiceService } from '../../service/user/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adm-users',
  standalone: true,
  imports: [NavComponent],
  templateUrl: './adm-users.component.html',
  styleUrl: './adm-users.component.css'
})
export class AdmUsersComponent {


  constructor(
    private fb : FormBuilder,
    private userService:UserServiceService,
    private router : Router
  ) { 

    if(this.userService.getUserLog().username.length === 0 ){
      this.router.navigate(['/login']);
    }
    
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }

}
