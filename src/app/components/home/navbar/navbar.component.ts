import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private route: Router) {
    
  }


  ngOnInit(): void {
    if (localStorage.getItem('token')){
      this.route.navigate(['/home']);
    }else{
      this.route.navigate(['/login']);
    }
  }
  

  logout() {
    localStorage.clear();
    this.route.navigate(['/login']);
  }
}
