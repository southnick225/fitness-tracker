import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{

  @Output() sidenavToggle = new EventEmitter<void>();
  authSubscription = new Subscription();
  isAuth: boolean;

  constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.authSubscription = this.authService.authChange.subscribe((auth) => {
      this.isAuth = auth;
    })
  }

  onToggleSidenav(){
    this.sidenavToggle.emit();
  }


  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
