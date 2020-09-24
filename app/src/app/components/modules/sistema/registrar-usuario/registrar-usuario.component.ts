import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.scss']
})
export class RegistrarUsuarioComponent implements OnInit {
  reloadTable: any;

  secciones: any[] = [];
  breadcrumb: any = {
    title: "Modulo Sistemas",
    items: [
      { name: "Inicio", route: "/home", redirectTo: true },
      { name: "Sistemas", route: "/Sistemas", redirectTo: true },
      { name: "Registrar Usuario", route: "", redirectTo: false },
    ]
  };

  constructor() { }

  ngOnInit() {
  }

  
  listenForm(event) {
    this.reloadTable = event;
  }

}
