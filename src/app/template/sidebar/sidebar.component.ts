import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  userLogged: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.userLogged = this.authService.getUserInfoAuthenticated().user_name;
  }

}
