import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ficha-tecnica',
  templateUrl: './ficha-tecnica.component.html',
  styleUrls: ['./ficha-tecnica.component.scss']
})
export class FichaTecnicaComponent implements OnInit {
  breadcrumb: any = {
    title: "Modulo Comercial",
    items: [
      { name: "Inicio", route: "/home", redirectTo: true },
      { name: "Comercial", route: "/Comercial", redirectTo: true },
      { name: "Ejecución de Cotización", route: "/Comercial/ejecucion-cotizacion", redirectTo: true },
      { name: "Ficha Técnica", route: "", redirectTo: false },
    ]
  };

  constructor() { }

  ngOnInit() {
  }


}
