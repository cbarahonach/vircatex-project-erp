import {  Component,  OnInit,  Output,  ViewChild,  EventEmitter} from "@angular/core";
import { UsuariosModel } from "src/app/models/usuarios.model";
import {  FormGroup,  FormBuilder,  Validators,  FormControl} from "@angular/forms";
import { AdminService } from "src/app/services/admin.service";
import { RolesModel } from "src/app/models/roles.model";
import { ReplaySubject, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { MatProgressButtonOptions } from "mat-progress-buttons";
import Swal from "sweetalert2";

@Component({
  selector: "app-frm-registrar-usuario",
  templateUrl: "./frm-registrar-usuario.component.html",
  styleUrls: ["./frm-registrar-usuario.component.scss"]
})
export class FrmRegistrarUsuarioComponent implements OnInit {
  @Output() updateTable = new EventEmitter();
  usuario: UsuariosModel;
  regUsuarioForm: FormGroup;
  roles: RolesModel[] = [];
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
    private AdminService: AdminService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.configForm();
    this.listarRoles();
    this.onChanges();
  }

  onChanges() {
    this.regUsuarioForm.statusChanges.subscribe(result =>
      result == "VALID"
        ? (this.spinnerButtonOptions.disabled = false)
        : (this.spinnerButtonOptions.disabled = true)
    );

    this.regUsuarioForm.controls.rolBuscador.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filtrarRoles();
      });
  }

  filtrarRoles(): void {
    if (!this.roles) {
      return;
    }
    let buscar = this.regUsuarioForm.controls.rolBuscador.value;
    if (!buscar) {
      this.rolFiltrado.next(this.roles.slice());
      return;
    } else {
      buscar = buscar.toLowerCase();
    }
    this.rolFiltrado.next(
      this.roles.filter(rol => rol.nombre.toLowerCase().indexOf(buscar) > -1)
    );
  }

  configForm(): void {
    this.regUsuarioForm = this.formBuilder.group({
      nombre: ["", [Validators.required, Validators.minLength(5)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(5)]],
      rol: ["", [Validators.required]],
      rolBuscador: ["", []]
    });
  }

  listarRoles(): void {
    this.AdminService.ListarRoles().subscribe(
      response => {
        response.data.map(rol => {
          let row = new RolesModel();
          row.id = rol.id;

          row.nombre = rol.nombre;
          this.roles.push(row);
        });
        this.rolFiltrado.next(this.roles);
      },
      err => console.log(err)
    );
  }

  registrarUsuario(): void {
    this.usuario = new UsuariosModel();
    this.usuario.nombre = this.regUsuarioForm.controls.nombre.value;
    this.usuario.email = this.regUsuarioForm.controls.email.value;
    this.usuario.password = this.regUsuarioForm.controls.password.value;
    this.usuario.rol_id = this.regUsuarioForm.controls.rol.value;
    this.AdminService.RegistrarUsuario(this.usuario).subscribe(
      response => {
        if (response.type == "success") {
          Swal.fire({
            icon: "success",
            text: response.message,
            confirmButtonColor: "#0069d9",
            confirmButtonText: "Aceptar"
          }).then(() => {
            this.regUsuarioForm.reset();
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
