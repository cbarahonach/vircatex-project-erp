import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RolesModel } from 'src/app/models/roles.model';
import { ReplaySubject, Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModulosModel } from 'src/app/models/modulos.model';
import { AdminService } from 'src/app/services/admin.service';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { takeUntil } from 'rxjs/operators';
import { ModulosRutasModel } from 'src/app/models/modulosRutas.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-frm-registrar-modulo',
  templateUrl: './frm-registrar-modulo.component.html',
  styleUrls: ['./frm-registrar-modulo.component.scss']
})
export class FrmRegistrarModuloComponent implements OnInit {
  @Output() updateTable = new EventEmitter();
  regModuloForm: FormGroup;
  regRutaForm: FormGroup;
  modulos: ModulosModel[] = [];
  moduloFiltrado: ReplaySubject<any> = new ReplaySubject<any>(1);
  _onDestroy = new Subject<void>();

  spinnerModuloButtonOptions: MatProgressButtonOptions = {
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

  spinnerRutaButtonOptions: MatProgressButtonOptions = {
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
    this.listarModulos();
    this.onChanges();
  }

  configForm(): void {
    this.regModuloForm = this.formBuilder.group({
      'nombre': [
        '', [Validators.required]
      ],
      'ruta': [
        '', [Validators.required]
      ]
    });
    this.regRutaForm = this.formBuilder.group({
      'modulo_id': [
        '', [Validators.required]
      ],
      'nombre': [
        '', [Validators.required]
      ],
      'ruta': [
        '', [Validators.required]
      ],
      'moduloBuscador': ['']
    });
  }

  onChanges() {
    this.regModuloForm.statusChanges.subscribe(
      result => (result == 'VALID') ?
        this.spinnerModuloButtonOptions.disabled = false : this.spinnerModuloButtonOptions.disabled = true
    );

    this.regRutaForm.statusChanges.subscribe(
      result => (result == 'VALID') ?
        this.spinnerRutaButtonOptions.disabled = false : this.spinnerRutaButtonOptions.disabled = true
    );

    this.regRutaForm.controls.moduloBuscador.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filtrarModulo();
      });
  }

  filtrarModulo(): void {
    if (!this.modulos) {
      return;
    }
    let buscar = this.regRutaForm.controls.moduloBuscador.value;
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

  listarModulos(): void {
    this.AdminService.ListarModulos().subscribe((response) => {
      response.data.map(modulo => {
        let mod = new ModulosModel();
        mod.id = modulo.id;
        mod.nombre = modulo.nombre;
        mod.ruta = modulo.ruta;

        this.modulos.push(mod);
      });
      this.moduloFiltrado.next(this.modulos);
    }, err => console.log(err));
  }

  registrarModulo(): void {
    let moduloFrm = this.regModuloForm.value;
    let modulo = new ModulosModel();
    modulo.nombre = moduloFrm.nombre;
    modulo.ruta = moduloFrm.ruta;

    this.AdminService.RegistrarModulo(modulo).subscribe((response) => {
      if (response.type == 'success') {
        Swal.fire({
          icon: 'success',
          text: response.message
        }).then(() => {
          this.updateTable.emit(true);
        });
      }
    }, err => console.log(err));
  }

  registrarRuta(): void {
    let rutaFrm = this.regRutaForm.value;
    let ruta = new ModulosRutasModel();
    ruta.modulo_id = rutaFrm.modulo_id;
    ruta.nombre = rutaFrm.nombre;
    ruta.ruta = rutaFrm.ruta;

    this.AdminService.RegistarRutas(ruta).subscribe((response) => {
      if (response.type == 'success') {
        Swal.fire({
          icon: 'success',
          text: response.message
        });
      }
    }, err => console.log(err));
  }
}
