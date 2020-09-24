import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { AdministracionService } from "src/app/services/administracion.service";
import { FormGroup, FormBuilder, Validators, NgForm } from "@angular/forms";
import { MatProgressButtonOptions } from "mat-progress-buttons";
import Swal from "sweetalert2";
import { __values } from "tslib";
import * as moment from "moment";

@Component({
  selector: "app-asistencias",
  templateUrl: "./asistencias.component.html",
  styleUrls: ["./asistencias.component.scss"]
})
export class AsistenciasComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("myForm", { static: true }) myForm: NgForm;

  dataSource: any;
  displayedColumns: any[] = ["id", "nombres", "accion", "guardar"];
  tipo_asistencia: any[] = [];
  acciones = [
    { name: "Asistió Puntual", status: true },
    { name: "Asistió Tarde", status: true },
    { name: "Faltó", status: true }
  ];
  data: any;
  hora: boolean = false;
  breadcrumb: any = {
    title: "Modulo Administracion",
    items: [
      { name: "Inicio", route: "/home", redirectTo: true },
      { name: "Administracion", route: "/Administracion", redirectTo: true },
      { name: "Asistencias", route: "", redirectTo: false }
    ]
  };

  spinnerButtonOptions: MatProgressButtonOptions = {
    active: false,
    disabled: false,
    text: "Guardar",
    spinnerSize: 18,
    raised: true,
    stroked: false,
    buttonColor: "primary",
    spinnerColor: "accent",
    fullWidth: false,
    mode: "indeterminate",
    buttonIcon: {
      fontIcon: "verified_user"
    }
  };

  constructor(
    private AdministracionService: AdministracionService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.listarAsistencias();
    this.calcHora();
  }

  calcHora() {
    let hora_inicio = moment(
      moment().format("M-D-YYYY") + " 07:00:00",
      "M/D/YYYY H:mm:ss"
    ).valueOf();
    let hora_fin = moment(
      moment().format("M-D-YYYY") + " 10:00:00",
      "M/D/YYYY H:mm:ss"
    ).valueOf();

    let hoy = moment(
      moment().format("M-D-YYYY H:mm:ss"),
      "M/D/YYYY H:mm:ss"
    ).valueOf();


    if (hora_inicio <= hoy && hoy <= hora_fin) {
      this.hora = true;
    }
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  listarAsistencias(): void {
    this.AdministracionService.ListarAsistencias().subscribe(response => {
      this.dataSource = new MatTableDataSource(response.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.configPaginator();
    });
  }

  registrarAsistencias(datos): void {
    const data = {
      id_personal: datos.id,
      tipo_asistencia: this.tipo_asistencia
    };

    this.AdministracionService.RegistrarAsistencias(data).subscribe(
      response => {
        if (response.type == "success") {
          this.listarAsistencias();
          this.tipo_asistencia = [];
        } else {
          Swal.fire({
            title: "Ocurrio un error inesperado, intentelo nuevamente.",
            icon: "warning"
          });
        }
      },
      err => console.log(err)
    );
  }

  configPaginator(): void {
    this.paginator._intl.itemsPerPageLabel = "Filas por página";
    this.paginator._intl.nextPageLabel = "Siguiente";
    this.paginator._intl.previousPageLabel = "Anterior";
  }
}
