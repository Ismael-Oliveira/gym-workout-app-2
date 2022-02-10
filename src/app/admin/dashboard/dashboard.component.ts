import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { ClientsService } from 'src/app/services/clients.service';
import { Client } from '../clients/clients';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  lineChartData: ChartDataSets[] = [
  ];
  lineChartLabels: Label[] = ['2016', '2017', '2018', '2020', '2021', '2022', '2023'];
  lineChartOptions = {
    responsive: true,
  };
  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(30, 172, 17, 1)',
    },
  ];
  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  clients: Client[] = [];
  errorMessageDeleteClient: String = "";

  constructor(private service: ClientsService, private router: Router) { }

  ngOnInit() {
    this.getAllClients();
  }

  getAllClients(): void {
    this.service.getClients()
          .subscribe((response: any) => {
            this.clients = response.content;
            this.fillBarChartData();
          });
  }

  private fillBarChartData() {
    let arrayYear = [0, 0, 0, 0, 0, 0, 0, 0];
    
    this.clients.forEach( (client, i) => {
      let year = this.returnYear(client);
      switch (year) {
        case 2018:
          arrayYear[1] += 1;
          break;
        case 2019:
          arrayYear[2] += 1;
          break;
        case 2020:
          arrayYear[3] += 1;
          break;
        case 2021:
          arrayYear[4] += 1;
          break;
        case 2022:
          arrayYear[5] += 1;
          break;
        case 2023:
          arrayYear[6] += 1;
          break;
      }
    });
    this.lineChartData = [{ data: arrayYear, label: 'Numero de cadastros nos últimos anos' }]
  }

  private returnYear(client) {
    let data = new Date(client.dateCreated);
    let year = data.getFullYear();
    return year;
  }
}
