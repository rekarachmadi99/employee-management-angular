import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatMenuModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(private router: Router) { }

  navigateTo(data: any) {
    this.router.navigate([data])
  }

  logout(): void {
    localStorage.clear()
    this.router.navigate(['/'])
  }
}
