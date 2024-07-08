import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { CommonModule } from '@angular/common';
import { NavComponent } from './components/nav/nav.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports:  [
    CommonModule, 
    RouterOutlet, 
    RouterLink, 
    RouterLinkActive, 
    NavComponent, 
    ReactiveFormsModule
  ],
    templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tienda_front';
}
