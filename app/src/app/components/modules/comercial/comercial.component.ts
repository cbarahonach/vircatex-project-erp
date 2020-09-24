import { Component, OnInit } from "@angular/core";
import { AdminService } from "src/app/services/admin.service";

@Component({
  selector: "app-comercial",
  templateUrl: "./comercial.component.html",
  styleUrls: ["./comercial.component.scss"]
})
export class ComercialComponent implements OnInit {
  secciones: any[] = [];
  breadcrumb: any = {
    title: "Modulo Comercial",
    items: [
      { name: "Inicio", route: "/home", redirectTo: true },
      { name: "Comercial", route: "", redirectTo: false }
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
          modulo => modulo.modulo == "Comercial"
        );
      },
      err => console.log(err)
    );
  }
}
