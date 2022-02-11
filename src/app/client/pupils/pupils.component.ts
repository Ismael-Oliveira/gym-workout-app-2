import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { Client } from 'src/app/admin/clients/clients';
import { Performance } from 'src/app/personal/performance/performance';
import { AuthService } from 'src/app/services/auth.service';
import { ClientsService } from 'src/app/services/clients.service';
import { GateOnlineService } from 'src/app/services/gateonline.service';

@Component({
  selector: 'app-pupils',
  templateUrl: './pupils.component.html',
  styles: []
})
export class PupilsComponent implements OnInit {

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartDataSets[] = [];
  dataChart = [];

  performancePupil: Performance;
  client: Client;
  errors: Object[] = [];
  performances: Performance[] = [];
  capacity: string;

  constructor(private clientService: ClientsService, private gateService: GateOnlineService, private router: Router, private authService: AuthService) {
    this.performancePupil = new Performance();
    this.performancePupil.id = 0;
  }
  
  ngOnInit() {
    let idUser = this.authService.getUserInfoAuthenticated().user_name.split(" ")[1];
    this.clientService.getClient(idUser).subscribe({
      next: (response) => {
        this.client = response;
        if (this.verifyPerformanceEmpty(this.client.performances)) {
          this.fillBarChartLabels(this.client.performances);
          this.fillBarChartData(this.client.performances);
          this.barChartData.push({ data: this.dataChart, label: 'Ultimos 5 IMCs'})
        } else {
          this.client.performances[0] = this.performancePupil; 
        }
      },
      error: (errorResponse) => {
        this.errors = errorResponse.error;
      }
    });

  }

  private fillBarChartData(performances) {
    for (let i = 0; i < 5; i++) {
      this.dataChart[i] = this.calculatorBMI(performances[i]);
    }
  }

  private fillBarChartLabels(performances) {

    let monthOfYear = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    let data = []
    for (let i = 0; i < 5; i++) {
      data = this.splitData(performances[i].dateEvaluation);
      this.barChartLabels[i] = `${this.splitData(performances[i].dateEvaluation)[2]} ${monthOfYear[--data[1]]}`;
    }
  }

  public splitData(data) {
    return data.split('-');
  }

  private verifyPerformanceEmpty(performances: Array<any>) {
    return performances.length > 0;
  }

  private sortPerformanceDesc(performances: Array<any>) {
    performances.sort((a, b) => b.id - a.id)
  }

  public calculatorTGC(performance: Performance) {
    let bmi = performance.weight/(Math.pow(performance.height,2));
    if (performance.sex === 1) {
      return parseInt((1.20 * bmi + 0.23*performance.ageOld - 16.2).toFixed(2));
    } else if (performance.sex === 2) {
      return parseInt((1.20 * bmi + 0.23*performance.ageOld - 5.4).toFixed(2));
    }
  }

  public calculatorBMI(performance: Performance) {
    return (performance.weight/(Math.pow(performance.height,2))).toFixed(2);
  }
}
