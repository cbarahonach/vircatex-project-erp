import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModulosModel } from 'src/app/models/modulos.model';
import { ModulosRutasModel } from 'src/app/models/modulosRutas.model';
import { ReplaySubject, Subject } from 'rxjs';
import { UsuariosModel } from 'src/app/models/usuarios.model';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { AdminService } from 'src/app/services/admin.service';
import { takeUntil } from 'rxjs/operators';
import { RolesModel } from 'src/app/models/roles.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-frm-registrar-acceso',
  templateUrl: './frm-registrar-acceso.component.html',
  styleUrls: ['./frm-registrar-acceso.component.scss']
})
export class FrmRegistrarAccesoComponent implements OnInit {
  @Output() updateTable = new EventEmitter();
  regAccesoForm: FormGroup;
  modulos: ModulosModel[] = [];
  rutas: ModulosRutasModel[] = [];
  roles: RolesModel[] = [];
  rolesRegistrados: any[] = [];
  moduloFiltrado: ReplaySubject<any> = new ReplaySubject<any>(1);
  rutaFiltrado: ReplaySubject<any> = new ReplaySubject<any>(1);
  rolFiltrado: ReplaySubject<any> = new ReplaySubject<any>(1);
  _onDestroy = new Subject<void>();
  rutasList: ModulosRutasModel[] = [];
  isModuleDisabled = true;
  isRutasDisabled = true;

  spinnerButtonOptions: MatProgressButtonOptions = {
    active: false,
    disabled: true,
    text: 'Registrar',
    spinnerSize: 18,
    raised: true,
    stroked: false,
    buttonColor: 'primary',
    spinnerColor: 'accent',
    fullWidth: false,
    mode: 'indeterminate',
    buttonIcon: {
      fontIcon: 'verified_user'
    }
  }

  constructor(
    private AdminService: AdminService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.configForm();
    this.init();
    this.onChanges();
  }

  init(): void {
    this.listarRoles();
    this.listarSelectores();
    this.listarRutas();
  }

  configForm(): void {
    this.regAccesoForm = this.formBuilder.group({
      'rol': ['', [Validators.required]],
      'rolBuscador': [''],
      'modulo': ['', [Validators.required]],
      'moduloBuscador': [''],
      'ruta': ['', [Validators.required,]],
      'rutaBuscador': ['']
    });
  }

  listarRoles(): void {
    this.AdminService.ListarRolesRegistradas().subscribe((response) => {
      this.rolesRegistrados = response.data;
    });

    this.AdminService.ListarRoles().subscribe((response) => {
      response.data.map(item => {
        let rol = new RolesModel();
        rol.id = item.id;
        rol.nombre = item.nombre;
        this.roles.push(rol);
      });
      this.rolFiltrado.next(this.roles);
    });
  }

  listarSelectores(): void {
    this.AdminService.ListarModulos().subscribe((response) => {
      response.data.map(modulo => {
        let mod = new ModulosModel();
        mod.id = modulo.id;
        mod.nombre = modulo.nombre;
        mod.ruta = modulo.ruta;

        this.modulos.push(mod);
      })
      this.moduloFiltrado.next(this.modulos);
    }, err => console.log(err));
  }

  listarRutas(): void {
    this.AdminService.ListarRutas().subscribe((response) => {
      response.data.map(ruta => {
        let ru = new ModulosRutasModel();
        ru.id = ruta.id;
        ru.nombre = ruta.nombre;
        ru.ruta = ruta.ruta;
        ru.modulo_id = ruta.modulo_id;
        this.rutasList.push(ru);
      })
    }, err => console.log(err));
  }

  onChanges() {
    this.regAccesoForm.statusChanges.subscribe(
      result => (result == 'VALID') ?
        this.spinnerButtonOptions.disabled = false : this.spinnerButtonOptions.disabled = true
    );

    this.regAccesoForm.controls.rolBuscador.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filtrarRol();
      })

    this.regAccesoForm.controls.moduloBuscador.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filtrarModulo();
      });

    this.regAccesoForm.controls.rutaBuscador.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filtrarRuta();
      });

    this.regAccesoForm.controls.rol.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe((response) => {
        this.isModuleDisabled = false;
        if (this.regAccesoForm.value.modulo > 0) {
          this.llenarRutas(this.regAccesoForm.value.modulo, response);
        }
      })

    this.regAccesoForm.controls.modulo.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe((response) => {
        this.llenarRutas(response);
      })
  }

  llenarRutas(response, rolResponse = 0): void {
    let rolValidator = (rolResponse > 0) ? rolResponse : this.regAccesoForm.value.rol;

    this.rutas = [];

    let rr = this.rolesRegistrados.filter((item) => {
      if (item.rol_id == rolValidator && item.modulo_id == response) {
        return item;
      }
    });

    this.rutas = this.rutasList.filter((ruta) => {
      if (ruta.modulo_id == response) {
        let find = false;
        for (let item of rr) {
          if (ruta.nombre == item.ruta_nombre) {
            find = true;
          }
        }
        if (!find) {
          return ruta;
        }
      }
    });

    this.rutaFiltrado.next(this.rutas);

    if (this.rutas.length > 0) {
      this.isRutasDisabled = false;
    } else {
      this.isRutasDisabled = true;
      this.regAccesoForm.controls.ruta.markAsUntouched();
      this.regAccesoForm.controls.ruta.reset();
    }

  }

  filtrarRol(): void {
    if (!this.roles) {
      return;
    }
    let buscar = this.regAccesoForm.controls.rolBuscador.value;

    if (!buscar) {
      this.rolFiltrado.next(this.roles.slice());
      return;
    } else {
      buscar = buscar.toLowerCase();
    }
    this.rolFiltrado.next(
      this.roles.filter(usuario => usuario.nombre.toLowerCase().indexOf(buscar) > -1)
    );
  }

  filtrarModulo(): void {
    if (!this.modulos) {
      return;
    }
    let buscar = this.regAccesoForm.controls.moduloBuscador.value;

    if (!buscar) {
      this.moduloFiltrado.next(this.modulos.slice());
      return;
    } else {
      buscar = buscar.toLowerCase();
    }
    this.moduloFiltrado.next(
      this.modulos.filter(modulo => modulo.nombre.toLowerCase().indexOf(buscar) > -1)
    );
  }

  filtrarRuta(): void {
    if (!this.rutas) {
      return;
    }
    let buscar = this.regAccesoForm.controls.rutaBuscador.value;
    if (!buscar) {
      this.rutaFiltrado.next(this.rutas.slice());
      return;
    } else {
      buscar = buscar.toLowerCase();
    }
    this.rutaFiltrado.next(
      this.rutas.filter(ruta => ruta.nombre.toLowerCase().indexOf(buscar) > -1)
    );
  }

  registrarAcceso() {
    if(!this.regAccesoForm.valid) { return; }
    this.AdminService.RegistrarRolesAccesos(this.regAccesoForm.value).subscribe((response) => {
      Swal.fire({
        icon: response.type,
        text: response.message
      }).then(()=> this.limpiarForm() );
    }, err => console.log(err));
  }

  limpiarForm() {
    this.modulos = [];
    this.rutas = [];
    this.roles = [];
    this.rutasList = [];
    this.regAccesoForm.reset(); 
    this.init();
  }
}
