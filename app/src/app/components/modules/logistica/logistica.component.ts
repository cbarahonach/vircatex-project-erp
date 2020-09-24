import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-logistica',
  templateUrl: './logistica.component.html',
  styleUrls: ['./logistica.component.scss']
})
export class LogisticaComponent implements OnInit {
  secciones: any[] = [];
  breadcrumb: any = {
    title: "Modulo Logistica",
    items: [
      { name: "Inicio", route: "/home", redirectTo: true },
      { name: "Logistica", route: "", redirectTo: false },
    ]
  };

  constructor(private AdminService: AdminService) { }

  ngOnInit() {
    this.ListarSecciones();
  }

  ListarSecciones(): void {
    this.AdminService.ListarModulosDisponibles().subscribe((response) => {
      this.secciones = response.data.filter(modulo => modulo.modulo == 'Logistica');
    }, err => console.log(err));
  }
}
