import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-externo',
  templateUrl: './externo.component.html',
  styleUrls: ['./externo.component.scss']
})
export class ExternoComponent implements OnInit {
  secciones: any[] = [];
  breadcrumb: any = {
    title: "Seccion Temporal",
    items: [
      { name: "Inicio", route: "/home", redirectTo: true },
      { name: "Externo", route: "", redirectTo: false },
    ]
  };

  constructor(private AdminService: AdminService) { }

  ngOnInit() {
    this.ListarSecciones();
  }

  ListarSecciones(): void {
    this.AdminService.ListarModulosDisponibles().subscribe((response) => {
      this.secciones = response.data.filter(modulo => modulo.modulo == 'Externo');
    }, err => console.log(err));
  }

}
