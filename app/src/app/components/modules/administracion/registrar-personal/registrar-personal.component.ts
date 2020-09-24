import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-registrar-personal",
  templateUrl: "./registrar-personal.component.html",
  styleUrls: ["./registrar-personal.component.scss"]
})
export class RegistrarPersonalComponent implements OnInit {
  breadcrumb: any = {
    title: "Modulo Administracion",
    items: [
      { name: "Inicio", route: "/home", redirectTo: true },
      { name: "Administracion", route: "/Administracion", redirectTo: true },
      { name: "Registrar personal", route: "", redirectTo: false }
    ]
  };

  reloadTable: any;

  constructor() {}

  ngOnInit() {}

  listenForm(event): void {
    this.reloadTable = event;
  }
}
