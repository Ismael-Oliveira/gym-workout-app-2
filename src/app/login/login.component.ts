import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string;
  password: string;
  errors: string[];

  constructor(private router: Router, private auth: AuthService) { }

  onSubmit() {
    this.auth
          .login(this.email, this.password)
          .subscribe( response => {
            const access_token = JSON.stringify(response);
            localStorage.setItem("access_token", access_token);
            this.router.navigateByUrl("/home");
          }, error => {
            this.errors = ["Usuário e/ou senha incorreto(s)."];
          })
  }

}
