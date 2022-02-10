import { Component, OnInit } from '@angular/core';

import { Client } from 'src/app/admin/clients/clients';

import { ClientsService } from 'src/app/services/clients.service';
import { AuthService } from 'src/app/services/auth.service';
import { Category } from 'src/app/personal/category/category';

import { Router } from '@angular/router';
@Component({
  selector: 'app-pupils-table',
  templateUrl: './pupils-table.component.html',
  styleUrls: ['./pupils-table.component.css']
})

export class PupilsTableComponent implements OnInit {

  client: Client;
  errors: Object[] = [];
  spreadSheetPupil: Object[];
  categories: Category[] = [];

  constructor(private clientService: ClientsService, private router: Router, private authService: AuthService) {
  }
  
  ngOnInit() {
    let idUser = this.authService.getUserInfoAuthenticated().user_name.split(" ")[1];
    this.clientService.getClient(idUser).subscribe({
      next: (response) => {
        this.client = response;
        this.spreadSheetPupil = this.client.card.categories;
      },
      error: (errorResponse) => {
        this.errors = errorResponse.error;
      }
    });
  }

  backToList() {
    this.router.navigate(["pupils/home"])
  } 
}
