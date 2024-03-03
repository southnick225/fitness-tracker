import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy{

  @Output() onCloseSidenav = new EventEmitter<void>();
  isAuth: boolean;
  authSubscription = new Subscription();

  constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.authSubscription = this.authService.authChange.subscribe((auth) => {
    this.isAuth = auth;
   })
    
  }

  onClose(){
    this.onCloseSidenav.emit();
  }

  onLogout(){
    this.authService.logout();
    this.onClose();
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

}
