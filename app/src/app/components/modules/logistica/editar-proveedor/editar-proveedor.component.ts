import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { LogisticaService } from "src/app/services/logistica.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProveedoresModel } from 'src/app/models/proveedores.model'
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject, Subject } from 'rxjs';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import Swal from 'sweetalert2';
import { ButtonHelper } from 'src/app/_helpers/button.helper';
import { AlertHelper } from 'src/app/_helpers/alert.helper';

@Component({
  selector: 'app-editar-proveedor',
  templateUrl: './editar-proveedor.component.html',
  styleUrls: ['./editar-proveedor.component.scss']
})
export class EditarProveedorComponent implements OnInit {
  buttonHelper: ButtonHelper = new ButtonHelper();
  alertSwal: AlertHelper = new AlertHelper();
  breadcrumb: any = {
    title: "Modulo Logistica",
    items: [
      { name: "Inicio", route: "/home", redirectTo: true },
      { name: "Logistica", route: "/Logistica", redirectTo: true },
      { name: "Listado Proveedores", route: "/Logistica/listado-proveedores", redirectTo: true },
      { name: "Actualizar Proveedor", route: "", redirectTo: false },
    ]
  };

  formSaved: boolean = false;
  Proveedorid: number = 0;
  acProveedorForm: FormGroup;
  proveedor: ProveedoresModel;
  _onDestroy = new Subject<void>();
  monedas: any;
  monedasFiltrado: ReplaySubject<any> = new ReplaySubject<any>(1);
  bancos: any;
  bancosFiltrado: ReplaySubject<any> = new ReplaySubject<any>(1);
  formaPagosFiltrado: ReplaySubject<any> = new ReplaySubject<any>(1);
  formaPagos: any;
  spinnerButtonOptions: MatProgressButtonOptions = this.buttonHelper.getSpinnerButton('Actualizar');

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private LogisticaService: LogisticaService
  ) { }

  ngOnInit() {
    this.configurarFormulario();
    this.route.params.subscribe(params => {
      this.Proveedorid = params["id"];
      this.ListarProveedorPorId(this.Proveedorid);
    });
    this.completarFormularioPorProveedor(this.Proveedorid);
    this.init();
  }

  init() {
    this.proveedor = new ProveedoresModel();
    this.listarUtilidades();
    this.onChanges();
  }

  listarUtilidades(): void {
    this.LogisticaService.UtilidadesRegistrarProveedor().subscribe(
      response => {
        this.formaPagos = response.data.formas_pagos;
        this.monedas = response.data.monedas;
        this.bancos = response.data.bancos;

        this.formaPagosFiltrado.next(this.formaPagos.slice());
        this.monedasFiltrado.next(this.monedas.slice());
        this.bancosFiltrado.next(this.bancos.slice());
      },
      err => console.log(err)
    );
  }

  onChanges() {
    this.acProveedorForm.statusChanges.subscribe(result =>
      result == "VALID"
        ? (this.spinnerButtonOptions.disabled = false)
        : (this.spinnerButtonOptions.disabled = true)
    );

    this.acProveedorForm.controls.forma_pago_buscador.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filtrarFormasPagos();
      });

    this.acProveedorForm.controls.banco_buscador.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filtrarBancos();
      });

  }

  filtrarBancos(): void {
    if (!this.bancos) {
      return;
    }
    let buscar = this.acProveedorForm.controls.banco_buscador.value;
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

  filtrarMonedas(): void {
    if (!this.monedas) {
      return;
    }
    let buscar = this.acProveedorForm.controls.moneda_buscador.value;
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

  filtrarFormasPagos(): void {
    if (!this.formaPagos) {
      return;
    }
    let buscar = this.acProveedorForm.controls.forma_pago_buscador.value;
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

  configurarFormulario() {
    this.acProveedorForm = this.formBuilder.group({
      correo: [""],
      razon_social: ["", [Validators.required]],
      direccion: [""],
      telefono: [""],
      ruc: ["", [Validators.required]],
      forma_pago: ["", [Validators.required]],
      forma_pago_buscador: [""],
      moneda: ["", [Validators.required]],
      moneda_buscador: [""],
      banco: ["", [Validators.required]],
      banco_buscador: [""],
      num_cuenta: [""],
      num_cuenta_cci: [""]
    });
  }
  ListarProveedorPorId(id: number) {
    this.LogisticaService.ListarProveedorPorId(id).subscribe(
      response => {
        this.completarFormularioPorProveedor(response.data[0]);
      },
      err => console.log(err)
    );
  }

  completarFormularioPorProveedor(prov): void {

    this.acProveedorForm.controls.correo.setValue(prov.correo);
    this.acProveedorForm.controls.razon_social.setValue(prov.razon_social);
    this.acProveedorForm.controls.direccion.setValue(prov.direccion);
    this.acProveedorForm.controls.telefono.setValue(prov.telefono);
    this.acProveedorForm.controls.ruc.setValue(prov.ruc);
    this.acProveedorForm.controls.banco.setValue(prov.banco);
    this.acProveedorForm.controls.num_cuenta.setValue(prov.num_cuenta);
    this.acProveedorForm.controls.num_cuenta_cci.setValue(prov.num_cuenta_interbancaria);
    this.acProveedorForm.controls.forma_pago.setValue(prov.forma_pago_id);
    this.acProveedorForm.controls.moneda.setValue(prov.moneda_id);
    this.acProveedorForm.controls.banco.setValue(prov.banco_id);


  }

  setProveedorActualizar(prov): ProveedoresModel {
    let proveedor = new ProveedoresModel();
    proveedor.id = this.Proveedorid;
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

  cancelarForm(type) {
    if (type == 'success') { }
    this.spinnerButtonOptions.active = false;
    this.formSaved = false;
  }

  actualizarProveedor() {
    if (!this.acProveedorForm.valid || this.formSaved) { return; }
    this.formSaved = true;
    this.spinnerButtonOptions.active = true;
    this.proveedor = this.setProveedorActualizar(this.acProveedorForm.value);

    this.LogisticaService.ActualizarProveedor(this.proveedor)
      .subscribe((response) => {
        this.alertSwal.showSwalMessage(response)
          .then(() => this.cancelarForm(response.type));
      }, err => {
        this.alertSwal.showSwalErrorMessage(err);
        this.cancelarForm('error');
      })
  }

}
