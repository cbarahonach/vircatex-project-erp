import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registrar-modulo',
  templateUrl: './registrar-modulo.component.html',
  styleUrls: ['./registrar-modulo.component.scss']
})
export class RegistrarModuloComponent implements OnInit {
  reloadTable: any;

  secciones: any[] = [];
  breadcrumb: any = {
    title: "Modulo Sistemas",
    items: [
      { name: "Inicio", route: "/home", redirectTo: true },
      { name: "Sistemas", route: "/Sistemas", redirectTo: true },
      { name: "Registrar Modulo", route: "", redirectTo: false },
    ]
  };

  constructor() { }

  ngOnInit() {
  }

  listenForm(event): void {
    this.reloadTable = event;
  }

}
