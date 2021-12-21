import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  userLogged: string;
  roleUser: string;
  roleAdministrator: boolean = false; 

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.userLogged = this.authService.getUserInfoAuthenticated().user_name;
    this.roleUser = this.authService.getUserInfoAuthenticated().authorities[0];
    this.verifyRoleUser();
  }

  verifyRoleUser() {
    switch (this.roleUser) {
      case "ROLE_ADMINISTRATOR":
        this.roleAdministrator = true;
        break;
      default:
        break;
    }
  }
}
