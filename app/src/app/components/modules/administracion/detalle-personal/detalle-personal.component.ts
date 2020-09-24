import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AdministracionService } from "src/app/services/administracion.service";
import { FormGroup, FormBuilder } from "@angular/forms";
import { MatProgressButtonOptions } from "mat-progress-buttons";
import Swal from 'sweetalert2';

@Component({
  selector: "app-detalle-personal",
  templateUrl: "./detalle-personal.component.html",
  styleUrls: ["./detalle-personal.component.scss"]
})
export class DetallePersonalComponent implements OnInit {
  personalId: number;
  breadcrumb: any = {
    title: "Modulo Administración",
    items: [
      { name: "Inicio", route: "/home", redirectTo: true },
      { name: "Administracion", route: "/Administracion", redirectTo: true },
      {
        name: "Registrar personal",
        route: "/Administracion/registrar-personal",
        redirectTo: true
      },
      { name: "Detalles del personal", route: "", redirectTo: false }
    ]
  };
  detalles: any;
  detallesForm: FormGroup;
  readFrm: boolean = true;


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
    private route: ActivatedRoute,
    private AdministracionSevice: AdministracionService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.configForm();
    this.route.params.subscribe(params => {
      this.personalId = params["id"];
      this.BuscarPersonalPorId(this.personalId);
    });      
  }

  BuscarPersonalPorId(id: number) {
    this.AdministracionSevice.BuscarPersonal(id).subscribe(
      response => {
        if (response.data.length <= 0) {
          this.router.navigate(["/notfound"]);
        } else {
          this.inicializarDet(response.data);
        }
      },
      err => console.log(err)
    );
  }

  inicializarDet(data: any) {
    this.detallesForm.controls.nombres.setValue(data.nombres);
    this.detallesForm.controls.apellidos.setValue(data.apellidos);
    this.detallesForm.controls.area.setValue(data.area);
    this.detallesForm.controls.hora_ingreso.setValue(data.hora_ingreso);
    this.detallesForm.controls.hora_salida.setValue(data.hora_salida);
  }

  configForm() {
    this.detallesForm = this.formBuilder.group({
      nombres: [""],
      apellidos: [""],
      area: [""],
      hora_ingreso: [""],
      hora_salida: [""]
    });
  }

  registrarPersonalDetalles() {
    const personal = {
      nombres: this.detallesForm.controls.nombres.value,
      apellidos: this.detallesForm.controls.apellidos.value,
      area: this.detallesForm.controls.area.value,
      hora_ingreso: this.detallesForm.controls.hora_ingreso.value,
      hora_salida: this.detallesForm.controls.hora_salida.value,
      id: this.personalId
    }
    this.AdministracionSevice.ActualizarPersonal(personal).subscribe(
      response => {
        if (response.type == "success") {
          Swal.fire({
            icon: "success",
            text: response.message,
            confirmButtonColor: "#0069d9",
            confirmButtonText: "Aceptar"
          }).then(() => {
            this.readFrm = true;
          });
        }
      },
      err => {
        Swal.fire({
          icon: "error",
          title: "Ocurrio un error",
          text: err
        });
      }
    );
    
  }
  statusFrm(status) {
    //EDIT OR READ FRM
    this.readFrm = status;
  }
}
