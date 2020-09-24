import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LogisticaService } from 'src/app/services/logistica.service';
import { ProveedoresModel } from 'src/app/models/proveedores.model';
import Swal from 'sweetalert2';
import { AlertHelper } from 'src/app/_helpers/alert.helper';
import { ButtonHelper } from 'src/app/_helpers/button.helper';

@Component({
  selector: 'app-registrar-proveedor',
  templateUrl: './registrar-proveedor.component.html',
  styleUrls: ['./registrar-proveedor.component.scss']
})

export class RegistrarProveedorComponent implements OnInit {
  alertSwal: AlertHelper = new AlertHelper();
  buttonHelper: ButtonHelper = new ButtonHelper();
  breadcrumb: any = {
    title: "Modulo Logistica",
    items: [
      { name: "Inicio", route: "/home", redirectTo: true },
      { name: "Logistica", route: "/Logistica", redirectTo: true },
      { name: "Registrar Proveedores", route: "", redirectTo: false },
    ]
  };
  proveedor: ProveedoresModel;
  regProveedorForm: FormGroup;
  formaPagosFiltrado: ReplaySubject<any> = new ReplaySubject<any>(1);
  monedasFiltrado: ReplaySubject<any> = new ReplaySubject<any>(1);
  bancos: any;
  bancosFiltrado: ReplaySubject<any> = new ReplaySubject<any>(1);
  formaPagos: any;
  monedas: any;
  _onDestroy = new Subject<void>();
  formSaved: boolean = false;

  spinnerButton: MatProgressButtonOptions = this.buttonHelper.getSpinnerButton('Registrar');

  constructor(
    private formBuilder: FormBuilder,
    private LogisticaService: LogisticaService
  ) { }

  ngOnInit() {
    this.configurarFormulario();
    this.init();
  }

  configurarFormulario() {
    this.regProveedorForm = this.formBuilder.group({
      correo: [""],
      razon_social: ["", [Validators.required]],
      ruc: ["", [Validators.required]],
      direccion: [""],
      telefono: [""],
      forma_pago: ["", [Validators.required]],
      forma_pago_buscador: [""],
      banco: ["", [Validators.required]],
      banco_buscador: [""],
      num_cuenta: [""],
      num_cuenta_cci: [""],
      moneda: ["", [Validators.required]],
      moneda_buscador: [""]
    });
  }

  init() {
    this.onChanges();
    this.listarUtilidades();
  }

  filtrarFormasPagos(): void {
    if (!this.formaPagos) {
      return;
    }
    let buscar = this.regProveedorForm.controls.forma_pago_buscador.value;
    if (!buscar) {
      this.formaPagosFiltrado.next(this.formaPagos.slice());
      return;
    } else {
      buscar = buscar.toLowerCase();
    }
    this.formaPagosFiltrado.next(
      this.formaPagos.filter(fp => fp.nombre.toLowerCase().indexOf(buscar) > -1)
    );
  }

  filtrarMonedas(): void {
    if (!this.monedas) {
      return;
    }
    let buscar = this.regProveedorForm.controls.moneda_buscador.value;
    if (!buscar) {
      this.monedasFiltrado.next(this.monedas.slice());
      return;
    } else {
      buscar = buscar.toLowerCase();
    }
    this.monedasFiltrado.next(
      this.monedas.filter(moneda => moneda.nombre.toLowerCase().indexOf(buscar) > -1)
    );
  }

  filtrarBancos(): void {
    if (!this.bancos) {
      return;
    }
    let buscar = this.regProveedorForm.controls.banco_buscador.value;
    if (!buscar) {
      this.bancosFiltrado.next(this.bancos.slice());
      return;
    } else {
      buscar = buscar.toLowerCase();
    }
    this.monedasFiltrado.next(
      this.bancos.filter(banco => banco.nombre.toLowerCase().indexOf(buscar) > -1)
    );
  }

  onChanges() {
    this.regProveedorForm.statusChanges.subscribe(result =>
      result == "VALID"
        ? (this.spinnerButton.disabled = false)
        : (this.spinnerButton.disabled = true)
    );

    this.regProveedorForm.controls.forma_pago_buscador.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filtrarFormasPagos();
      });

    this.regProveedorForm.controls.moneda_buscador.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filtrarMonedas();
      })

    this.regProveedorForm.controls.banco_buscador.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filtrarBancos();
      });
  }

  listarUtilidades(): void {
    this.LogisticaService.UtilidadesRegistrarProveedor().subscribe(
      response => {
        this.formaPagos = response.data.formas_pagos;
        this.monedas = response.data.monedas;
        this.bancos = response.data.bancos;

        this.formaPagosFiltrado.next(this.formaPagos.slice());
        this.monedasFiltrado.next(this.monedas.slice());
        console.log(response);

        this.bancosFiltrado.next(this.bancos.slice());
      },
      err => console.log(err)
    );
  }

  cancelarForm(type) {
    if (type == 'success') {
      this.regProveedorForm.reset();
    }
    this.spinnerButton.active = false;
    this.formSaved = false;
  }

  setProveedorRegistro(prov): ProveedoresModel {
    let proveedor = new ProveedoresModel();

    proveedor.razon_social = prov.razon_social;
    proveedor.ruc = prov.ruc;
    proveedor.direccion = prov.direccion;
    proveedor.telefono = prov.telefono;
    proveedor.forma_pago_id = prov.forma_pago;
    proveedor.banco_id = prov.banco;
    proveedor.num_cuenta = prov.num_cuenta;
    proveedor.num_cuenta_interbancaria = prov.num_cuenta_cci;
    proveedor.correo = prov.correo;
    proveedor.moneda_id = prov.moneda;

    return proveedor;
  }

  registrarProveedor() {
    if (!this.regProveedorForm.valid || this.formSaved) { return; }
    this.formSaved = true;
    this.spinnerButton.active = true;
    this.proveedor = this.setProveedorRegistro(this.regProveedorForm.value);

    this.LogisticaService.RegistrarProveedor(this.proveedor)
      .subscribe((response) => {
        this.alertSwal.showSwalMessage(response)
          .then(() => this.cancelarForm(response.type));
      }, err => {
        this.alertSwal.showSwalErrorMessage(err);
        this.cancelarForm('error');
      })
  }

}
