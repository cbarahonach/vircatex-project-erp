import { Component, OnInit } from "@angular/core";
import { TokenService } from "src/app/services/token.service";
import { AdminService } from "src/app/services/admin.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  modulos: any[] = [];
  breadcrumb: any = {
    title: "Modulos",
    items: []
  };

  constructor(
    private AdminService: AdminService,
    private TokenService: TokenService
  ) {}

  ngOnInit() {
    this.ListarSecciones();
  }

  ListarSecciones(): void {
    this.AdminService.ListarModulosDisponibles().subscribe(
      response => {
        this.modulos = this.removeDuplicates(response.data, "modulo");
      },
      err => console.log(err)
    );
  }

  removeDuplicates(array, key) {
    return array.filter(
      (obj, index, self) => index === self.findIndex(el => el[key] === obj[key])
    );
  }
}
