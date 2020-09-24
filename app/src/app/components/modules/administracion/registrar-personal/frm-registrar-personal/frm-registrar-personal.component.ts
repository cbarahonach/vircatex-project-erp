import { Component, OnInit, Output, EventEmitter, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { ReplaySubject, Subject } from "rxjs";
import { MatProgressButtonOptions } from "mat-progress-buttons";
import { PersonalModel } from "src/app/models/personal.model";
import Swal from "sweetalert2";
import { AdministracionService } from "src/app/services/administracion.service";

@Component({
  selector: "app-frm-registrar-personal",
  templateUrl: "./frm-registrar-personal.component.html",
  styleUrls: ["./frm-registrar-personal.component.scss"]
})
export class FrmRegistrarPersonalComponent implements OnInit {
  @Output() updateTable = new EventEmitter();
  personal: PersonalModel;
  regPersonalForm: FormGroup;
  rolFiltrado: ReplaySubject<any> = new ReplaySubject<any>(1);
  _onDestroy = new Subject<void>();

  spinnerButtonOptions: MatProgressButtonOptions = {
    active: false,
    disabled: true,
    text: "Registrar",
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
  ) { }

  ngOnInit() {
    this.configForm();
    this.onChanges();
  }

  onChanges() {
    this.regPersonalForm.statusChanges.subscribe(result =>
      result == "VALID"
        ? (this.spinnerButtonOptions.disabled = false)
        : (this.spinnerButtonOptions.disabled = true)
    );
  }

  configForm(): void {
    this.regPersonalForm = this.formBuilder.group({
      nombres: ["", [Validators.required]],
      apellidos: ["", [Validators.required]],
      area: ["", [Validators.required]],
      hora_ingreso: ["", [Validators.required]],
      hora_salida: ["", [Validators.required]]
    });
  }

  registrarPersonal(): void {
    if (!this.regPersonalForm.valid) {
      return;
    }
    this.personal = new PersonalModel();
    this.personal.nombres = this.regPersonalForm.controls.nombres.value;
    this.personal.apellidos = this.regPersonalForm.controls.apellidos.value;
    this.personal.area = this.regPersonalForm.controls.area.value;
    this.personal.hora_ingreso = this.regPersonalForm.controls.hora_ingreso.value;
    this.personal.hora_salida = this.regPersonalForm.controls.hora_salida.value;

    this.AdministracionService.RegistrarPersonal(this.personal).subscribe(
      response => {
        if (response.type == "success") {
          Swal.fire({
            icon: "success",
            text: response.message,
            confirmButtonColor: "#0069d9",
            confirmButtonText: "Aceptar"
          }).then(() => {
            this.regPersonalForm.reset();
            this.updateTable.emit(true);
          });
        }
      },
      err => {
        Swal.fire({
          icon: "error",
          text: err
        });
      }
    );
  }
}
