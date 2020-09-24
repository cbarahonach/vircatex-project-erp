import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registrar-acceso',
  templateUrl: './registrar-acceso.component.html',
  styleUrls: ['./registrar-acceso.component.scss']
})
export class RegistrarAccesoComponent implements OnInit {
  reloadTable: any;
  secciones: any[] = [];
  breadcrumb: any = {
    title: "Modulo Sistemas",
    items: [
      { name: "Inicio", route: "/home", redirectTo: true },
      { name: "Sistemas", route: "/Sistemas", redirectTo: true },
      { name: "Registrar Acceso", route: "", redirectTo: false },
    ]
  };

  constructor() { }

  ngOnInit() {
  }

  listenForm(event) {
    this.reloadTable = event;
  }

}
