import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string;
  password: string;
  errorLogin: boolean;

  constructor(private router: Router) { }

  onSubmit() {
    console.log("user:"+this.email+" pass: "+this.password);
    this.router.navigateByUrl("/home");
  }

}
