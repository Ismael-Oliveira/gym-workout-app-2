import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { AuthService } from '../services/auth.service';
import { GateOnlineService } from '../services/gateonline.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userLogged: string;
  roleUser: string;
  roleAdministrator: boolean = false; 
  roleClient: boolean = false; 

  capacity: string;
  date: Date;
  today: string;

  constructor(private gateService: GateOnlineService, private authService: AuthService) { }

  ngOnInit() {
    this.userLogged = this.authService.getUserInfoAuthenticated().user_name.split(" ")[0];
    this.roleUser = this.authService.getUserInfoAuthenticated().authorities[0];
    this.verifyRoleUser();
    this.gateService.getCapacity().subscribe({
      next: (response) => {
        this.capacity = response.quantityClient.toString();
        this.today = this.weekDay();
      }
    });
  }

  verifyRoleUser() {
    switch (this.roleUser) {
      case "ROLE_ADMINISTRATOR":
        this.roleAdministrator = true;
        break;
      case "ROLE_CLIENT":
        this.roleClient = true;
        break;
      default:
        break;
    }
  }

  public selectedColor() {

    let color = 'color-blue';
    if (this.capacity > '40' && this.capacity < '80') {
      color = 'color-green'
    } else if (this.capacity > '80') {
      color = 'color-red'
    }
    
    return color;
  }

  public weekDay() {
    let days = ['Domingo', 'Segunda-Feira','Terça-Feira','Quarta-Feira','Quinta-Feira','Sexta-Feira', 'Sabado'];
    let day = new Date(Date.now());
    return days[day.getDay()];
  }
}
