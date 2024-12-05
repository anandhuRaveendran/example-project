import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router) {}

  token: string | null = '';

  ngOnInit() {
    this.token = localStorage.getItem('token');
    if (!this.token) {
      this.router.navigate(['/login']);
    }
  }
 onLogout() {
   localStorage.removeItem('token');
   this.router.navigate(['/login']);
  }
}
