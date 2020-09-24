import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reporte-manufactura',
  templateUrl: './reporte-manufactura.component.html',
  styleUrls: ['./reporte-manufactura.component.scss']
})
export class ReporteManufacturaComponent implements OnInit {
  breadcrumb: any = {
    title: "Seccion Temporal",
    items: [
      { name: "Inicio", route: "/home", redirectTo: true },
      { name: "Externo", route: "/Externo", redirectTo: true },
      { name: "Reporte Manufactura", route: "", redirectTo: false },
    ]
  };

  updateTbl: any;

  constructor() { }

  ngOnInit() {
  }

  reloadTbl(event): void {
    this.updateTbl = event;
  }

}
