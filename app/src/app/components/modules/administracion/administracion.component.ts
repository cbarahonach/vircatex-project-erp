import { Component, OnInit } from "@angular/core";
import { AdminService } from "src/app/services/admin.service";

@Component({
  selector: "app-administracion",
  templateUrl: "./administracion.component.html",
  styleUrls: ["./administracion.component.scss"]
})
export class AdministracionComponent implements OnInit {
  secciones: any[] = [];
  breadcrumb: any = {
    title: "Modulo Administracion",
    items: [
      { name: "Inicio", route: "/home", redirectTo: true },
      { name: "Administracion", route: "", redirectTo: false }
    ]
  };

  constructor(private AdminService: AdminService) {}

  ngOnInit() {
    this.ListarSecciones();
  }

  ListarSecciones(): void {
    this.AdminService.ListarModulosDisponibles().subscribe(
      response => {
        this.secciones = response.data.filter(
          modulo => modulo.modulo == "Administracion"
        );
      },
      err => console.log(err)
    );
  }
}
