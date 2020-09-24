import { Component, OnInit } from "@angular/core";
import { TokenService } from "src/app/services/token.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import * as moment from "moment";
import { MatProgressButtonOptions } from "mat-progress-buttons";
import { AuthService } from "src/app/services/auth.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-perfil",
  templateUrl: "./perfil.component.html",
  styleUrls: ["./perfil.component.scss"]
})
export class PerfilComponent implements OnInit {
  breadcrumb: any = {
    title: "Perfil",
    items: [
      { name: "Inicio", route: "/home", redirectTo: true },
      { name: "Perfil", route: "", redirectTo: false }
    ]
  };
  user: userPayload = new userPayload();
  regProfileForm: FormGroup;
  changePass: boolean = true;

  spinnerButtonOptions: MatProgressButtonOptions = {
    active: false,
    disabled: true,
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
    private tokenService: TokenService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadUserData();
    this.configForm();

    this.regProfileForm.statusChanges.subscribe(result =>
      result == "VALID"
        ? (this.spinnerButtonOptions.disabled = false)
        : (this.spinnerButtonOptions.disabled = true)
    );
  }

  loadUserData() {
    let payload = this.tokenService.GetPayload();
    this.user.id = payload.id;
    this.user.rol_id = payload.rol_id;
    this.user.nombre = payload.nombre;
    this.user.email = payload.email;
    this.user.rol_nombre = payload.rol_nombre;
    this.user.created_at = moment(payload.created_at.split(" ")[0])
      .locale("es")
      .format("LL");
  }

  configForm() {
    this.regProfileForm = this.formBuilder.group(
      {
        nombres: { value: this.user.nombre, disabled: true },
        email: { value: this.user.email, disabled: true },
        cargo: { value: this.user.rol_nombre, disabled: true },
        registro: { value: this.user.created_at, disabled: true },
        clave_actual: ["", [Validators.required, Validators.minLength(5)]],
        clave_nueva: ["", [Validators.required, Validators.minLength(5)]],
        clave_nueva_confirm: [
          "",
          [Validators.required, Validators.minLength(5)]
        ]
      },
      { validator: this.checkPasswords }
    );
  }

  checkPasswords(group: FormGroup) {
    let pass = group.get("clave_nueva").value;
    let confirmPass = group.get("clave_nueva_confirm").value;

    return pass === confirmPass ? null : { notSame: true };
  }

  changePassword() {
    if (this.spinnerButtonOptions.disabled) {
      return;
    }
    this.user.password = this.regProfileForm.controls.clave_actual.value;
    this.user.new_password = this.regProfileForm.controls.clave_nueva.value;

    if (this.user.password == this.user.new_password) {
      Swal.fire({
        icon: "info",
        title: "Sucedio un inconveniente",
        text: "La nueva contraseña debe ser diferente a la actual."
      });

      return;
    }
    this.authService.ChangePassword(this.user).subscribe(
      response => {
        Swal.fire({
          icon: response.type,
          text: response.message
        });
        if (response.type == "success") {
          this.clearForm();
        }
      },
      err => console.log(err)
    );
  }

  statusFrm(status) {
    //EDIT OR READ FRM
    this.changePass = status;
    if (status) {
      this.clearForm();
    }
  }

  clearForm() {
    this.regProfileForm.controls.clave_actual.reset();
    this.regProfileForm.controls.clave_nueva.reset();
    this.regProfileForm.controls.clave_nueva_confirm.reset();
    this.regProfileForm.controls.clave_actual.markAsUntouched();
    this.regProfileForm.controls.clave_nueva.markAsUntouched();
    this.regProfileForm.controls.clave_nueva_confirm.markAsUntouched();

    this.changePass = true;
  }
}

class userPayload {
  id: number;
  rol_id: number;
  nombre: string;
  email: string;
  rol_nombre: string;
  password: string;
  new_password: string;
  created_at: string;
}
