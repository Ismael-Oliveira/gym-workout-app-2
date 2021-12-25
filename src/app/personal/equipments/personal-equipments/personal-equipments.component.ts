import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Equipments } from 'src/app/admin/equipments/equipments';
import { Constants } from 'src/app/constants';
import { EquipmentsService } from 'src/app/services/equipments.service';

@Component({
  selector: 'app-personal-equipments',
  templateUrl: './personal-equipments.component.html',
  styleUrls: ['./personal-equipments.component.css']
})
export class PersonalEquipmentsComponent implements OnInit {

  equipments: Equipments[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private service: EquipmentsService, private router: Router) { }

  ngOnInit() {
    this.getAllEquipments();
    this.dtOptions = Constants.CONFIG_DATA_TABLES;
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  
  newEquipment() {
    this.router.navigate(["/equipments/form"]);
  }

  getAllEquipments(): void {
    this.service.getEquipments()
          .subscribe((response: any) => {
            this.equipments = response.content;
            // initiate our data table
            this.dtTrigger.next(true);
          });
  }

}
