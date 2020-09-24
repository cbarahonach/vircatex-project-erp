import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-sistema',
  templateUrl: './sistema.component.html',
  styleUrls: ['./sistema.component.scss']
})
export class SistemaComponent implements OnInit {
  secciones: any[] = [];
  breadcrumb: any = {
    title: "Modulo Sistemas",
    items: [
      { name: "Inicio", route: "/home", redirectTo: true },
      { name: "Sistemas", route: "", redirectTo: false },
    ]
  };

  constructor(private AdminService: AdminService) { }

  ngOnInit() {
    this.ListarSecciones();
  }

  ListarSecciones(): void {
    this.AdminService.ListarModulosDisponibles().subscribe((response) => {
      this.secciones = response.data.filter(modulo => modulo.modulo == 'Sistemas');
    }, err => console.log(err));
  }

}
