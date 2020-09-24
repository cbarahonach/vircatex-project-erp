import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LogisticaService } from 'src/app/services/logistica.service';
import * as moment from 'moment';
import { ProveedoresModel } from 'src/app/models/proveedores.model'
import { OrdenComprasServiciosModel } from 'src/app/models/OrdenComprasServiciosModel.model';
import { OrdenComprasItemsModel } from 'src/app/models/ordenComprasItems.model';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { ModalOrdenCompraItemsComponent } from './modal-orden-compra-items/modal-orden-compra-items.component';
import { AdminService } from 'src/app/services/admin.service';
import Swal from "sweetalert2";
import { TokenService } from 'src/app/services/token.service';
import { AlertHelper } from 'src/app/_helpers/alert.helper';
import { ButtonHelper } from 'src/app/_helpers/button.helper';

const descripcion_table = 'DESCRIPCION'
@Component({
  selector: 'app-registrar-orden-compra',
  templateUrl: './registrar-orden-compra.component.html',
  styleUrls: ['./registrar-orden-compra.component.scss']
})
export class RegistrarOrdenCompraComponent implements OnInit {
  alertSwal: AlertHelper = new AlertHelper();
  buttonHelper: ButtonHelper = new ButtonHelper();
  breadcrumb: any = {
    title: "Modulo Logistica",
    items: [
      { name: "Inicio", route: "/home", redirectTo: true },
      { name: "Logistica", route: "/Logistica", redirectTo: true },
      { name: "Registrar Orden de Compra", route: "", redirectTo: false },
    ]
  };
  monedas: any;
  monedasFiltrado: ReplaySubject<any> = new ReplaySubject<any>(1);
  formaPagosFiltrado: ReplaySubject<any> = new ReplaySubject<any>(1);
  formaPagos: any;
  regOrdenCompraForm: FormGroup;
  proveedorFiltrado: ReplaySubject<any> = new ReplaySubject<any>(1);
  proveedores: any;
  bancos: any;
  bancosFiltrado: ReplaySubject<any> = new ReplaySubject<any>(1);
  _onDestroy = new Subject<void>();
  formSaved: boolean = false;
  ordenCompra: OrdenComprasServiciosModel;
  proveedor: ProveedoresModel;
  listadoItems: Array<OrdenComprasItemsModel> = [];
  direccionSistema: string = "";
  displayedColumns_igv: string[] = [];
  transactions: any[] = [];
  igv: number = 0;
  subtotal: number = 0;
  subtotal_2: number = 0;
  descuento: number = 0;
  precios: any[] = [];
  elemento_borrado: number = 0;
  reducer = (accumulator, currentValue) => accumulator + currentValue;
  desc_title = descripcion_table;
  usuario: any = {};
  igvCheck: boolean = false;
  simboloMoneda: any = '';

  spinnerButtonOptions: MatProgressButtonOptions = this.buttonHelper.getSpinnerButton('Registrar');

  displayedColumns: string[] = [
    'item', 'concepto', 'cantidad', 'unidad_medida',
    'precio_unitario', 'precio_total', 'delete'
  ];
  dataSource: MatTableDataSource<any>;

  constructor(
    private formBuilder: FormBuilder,
    private LogisticaService: LogisticaService,
    public Dialog: MatDialog,
    private AdminService: AdminService,
    private TokenService: TokenService
  ) { }

  ngOnInit() {
    this.configurarFormulario();
    this.init();
    this.loadUser();
  }
  loadUser() {
    this.usuario = this.TokenService.GetPayload();

  }

  configurarFormulario() {
    this.regOrdenCompraForm = this.formBuilder.group({
      correo: [""],
      proveedor: ["", [Validators.required]],
      tipo_orden: ["", [Validators.required]],
      proveedor_buscador: [""],
      direccion: [""],
      telefono: [""],
      ruc: ["", [Validators.required]],
      programa: [""],
      po: [""],
      fecha: ["", [Validators.required]],
      forma_pago: ["", [Validators.required]],
      forma_pago_buscador: [""],
      moneda: ["", [Validators.required]],
      moneda_buscador: [""],
      banco: ["", [Validators.required]],
      banco_buscador: [""],
      num_cuenta: [""],
      num_cuenta_cci: [""],
      fecha_entrega: ["", [Validators.required]],
      lugar_entrega: ["", [Validators.required]],
      items: ["", [Validators.required]],
      igv: [true]
    });
  }

  init() {
    this.dataSource = new MatTableDataSource();
    this.ordenCompra = new OrdenComprasServiciosModel();
    this.proveedor = new ProveedoresModel();
    this.onChanges();
    this.listarUtilidadesOrdenCompra();
    this.listarUtilidades();
    this.detallesSistema();
  }

  detallesSistema() {
    this.AdminService.DetallesSistema().subscribe(
      response => {
        this.direccionSistema = response.data.direccion;
        this.configTableResultado(response.data.igv);
        this.regOrdenCompraForm.controls.lugar_entrega.setValue(this.direccionSistema);
      },
      err => console.log(err)
    );
  }

  onChanges() {
    this.regOrdenCompraForm.statusChanges.subscribe(result =>
      result == "VALID"
        ? (this.spinnerButtonOptions.disabled = false)
        : (this.spinnerButtonOptions.disabled = true)
    );

    this.regOrdenCompraForm.controls.igv.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe((status) => {
        this.igvCheck = status;
      });

    this.regOrdenCompraForm.controls.proveedor_buscador.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filtrarProveedores();
      });

    this.regOrdenCompraForm.controls.proveedor.valueChanges
      .subscribe((id_proveedor) => {
        this.completarFormularioPorProveedor(id_proveedor);
      })

    this.regOrdenCompraForm.controls.tipo_orden.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe((id_orden) => {
        switch (id_orden) {
          case 1:
            this.desc_title = 'DESCRIPCION DEL PRODUCTO';
            break;
          case 2:
            this.desc_title = 'DESCRIPCION DEL SERVICIO';
            break;
          default:
            this.desc_title = 'DESCRIPCION';
        }

      })

    this.regOrdenCompraForm.controls.forma_pago_buscador.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filtrarFormasPagos();
      });

    this.regOrdenCompraForm.controls.moneda_buscador.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filtrarMonedas();
      })

    this.regOrdenCompraForm.controls.moneda.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe((value) => {
        this.setMonedaSimbolo(value);
      })

  }

  filtrarProveedores(): void {
    if (!this.proveedores) {
      return;
    }
    let buscar = this.regOrdenCompraForm.controls.proveedor_buscador.value;
    if (!buscar) {
      this.proveedorFiltrado.next(this.proveedores.slice());
      return;
    } else {
      buscar = buscar.toLowerCase();
    }
    this.proveedorFiltrado.next(
      this.proveedores.filter(prov => prov.razon_social.toLowerCase().indexOf(buscar) > -1)
    );
  }

  filtrarFormasPagos(): void {
    if (!this.formaPagos) {
      return;
    }
    let buscar = this.regOrdenCompraForm.controls.forma_pago_buscador.value;
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
    let buscar = this.regOrdenCompraForm.controls.moneda_buscador.value;
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


  completarFormularioPorProveedor(id_proveedor): void {
    if (id_proveedor == null || id_proveedor == undefined) { return; }

    let provSelected = this.proveedores.filter(proveedor => {
      return proveedor.id === id_proveedor;
    })[0];

    this.regOrdenCompraForm.controls.direccion.setValue(provSelected.direccion);
    this.regOrdenCompraForm.controls.telefono.setValue(provSelected.telefono);
    this.regOrdenCompraForm.controls.ruc.setValue(provSelected.ruc);
    this.regOrdenCompraForm.controls.banco.setValue(provSelected.banco_id);
    this.regOrdenCompraForm.controls.correo.setValue(provSelected.correo);
    this.regOrdenCompraForm.controls.num_cuenta.setValue(provSelected.num_cuenta);
    this.regOrdenCompraForm.controls.num_cuenta_cci.setValue(provSelected.num_cuenta_interbancaria);
    this.regOrdenCompraForm.controls.fecha.setValue(moment().locale("es").format("LL"));
    this.regOrdenCompraForm.controls.forma_pago.setValue(provSelected.forma_pago_id);
    this.regOrdenCompraForm.controls.moneda.setValue(provSelected.moneda_id);

    this.setMonedaSimbolo(provSelected.moneda_id);
  }

  setMonedaSimbolo(moneda_id) {
    let simbolo = this.monedas.filter(moneda => moneda.id === moneda_id)[0];

    this.simboloMoneda = simbolo.codigo_moneda;
  }

  listarUtilidadesOrdenCompra() {
    this.LogisticaService.ListarProveedores().subscribe((response) => {
      this.proveedores = response.data;
      this.proveedorFiltrado.next(this.proveedores.slice());
    }, err => console.log(err));
  }

  listarUtilidades(): void {
    this.LogisticaService.UtilidadesRegistrarProveedor().subscribe(
      response => {
        this.formaPagos = response.data.formas_pagos;
        this.monedas = response.data.monedas;
        this.bancos = response.data.bancos;

        this.formaPagosFiltrado.next(this.formaPagos.slice());
        this.monedasFiltrado.next(this.monedas.slice());
        this.bancosFiltrado.next(this.bancos.slice())
      },
      err => console.log(err)
    );
  }

  agregarItem() {
    const dialogRef = this.Dialog.open(ModalOrdenCompraItemsComponent, {
      data: {
        title: this.desc_title
      },
      disableClose: true,
      position: {}
    });

    dialogRef.afterClosed().subscribe(e => {
      if (e !== undefined) {
        let oci = new OrdenComprasItemsModel();
        oci.item = e.item;
        oci.concepto = e.concepto;
        oci.cantidad = e.cantidad;
        oci.unidad_medida = e.unidad_medida;
        oci.precio_unitario = e.precio_unitario;
        this.listadoItems.push(oci);
        this.dataSource = new MatTableDataSource(this.listadoItems);
        this.acumularResultados(oci);
        this.regOrdenCompraForm.controls.items.setValue(this.listadoItems);
      }
    });
  }

  limpiarItemsCajaSubtotal() {
    this.listadoItems = [];
    this.dataSource = new MatTableDataSource(this.listadoItems);
    this.subtotal = 0;
    this.elemento_borrado = 0;
    this.igv = 0;
    this.precios = [];
    this.displayedColumns_igv = ["titles", "costos"];
    this.transactions = [
      { item: "Subtotal", cost: this.subtotal - this.elemento_borrado },
      { item: "Descuentos", cost: this.descuento },
      { item: "IGV", cost: this.igv * (this.subtotal - this.elemento_borrado) }
    ];

  }

  precioTotalRow(item) {
    return (
      parseFloat(item.cantidad) * parseFloat(item.precio_unitario)
    ).toFixed(2);
  }

  setOrdenCompra() {
    this.ordenCompra.usuario_id = this.usuario.id;
    this.ordenCompra.tipo_orden = this.regOrdenCompraForm.controls.tipo_orden.value;
    this.ordenCompra.proveedor_id = this.regOrdenCompraForm.controls.proveedor.value;
    this.ordenCompra.programa = this.regOrdenCompraForm.controls.programa.value;
    this.ordenCompra.po = this.regOrdenCompraForm.controls.po.value;
    this.ordenCompra.fecha_entrega = this.regOrdenCompraForm.controls.fecha_entrega.value;
    this.ordenCompra.igv = this.regOrdenCompraForm.controls.igv.value ? 1 : 0;

    this.proveedor.id = this.regOrdenCompraForm.controls.proveedor.value;
    this.proveedor.banco_id = this.regOrdenCompraForm.controls.banco.value;
    this.proveedor.forma_pago_id = this.regOrdenCompraForm.controls.forma_pago.value;
    this.proveedor.moneda_id = this.regOrdenCompraForm.controls.moneda.value;
    this.proveedor.num_cuenta = this.regOrdenCompraForm.controls.num_cuenta.value;
    this.proveedor.num_cuenta_interbancaria = this.regOrdenCompraForm.controls.num_cuenta_cci.value;
  }

  cancelarForm(type) {
    if (type == 'success') {
      this.regOrdenCompraForm.reset();
      this.regOrdenCompraForm.controls.lugar_entrega.setValue(this.direccionSistema);
      //Limpiar los items de lka tabla items
      this.limpiarItemsCajaSubtotal();
    }

    this.spinnerButtonOptions.active = false;
    this.formSaved = false;
  }

  registrarOrdenCompra() {
    if (!this.regOrdenCompraForm.valid || this.formSaved) { return; }

    this.formSaved = true;
    this.spinnerButtonOptions.active = true;
    this.setOrdenCompra();

    this.LogisticaService
      .RegistrarOrdenCompra(this.ordenCompra, this.listadoItems, this.proveedor)
      .subscribe(response => {
        this.alertSwal.showSwalMessage(response, 'CODIGO: ' + response.data.codigo)
          .then(() => this.cancelarForm(response.type));
      },
        err => {
          this.alertSwal.showSwalErrorMessage(err);
          this.cancelarForm('error');
        }
      );
  }

  acumularResultados(data) {
    this.precios
      .push(parseFloat(data.cantidad) * parseFloat(data.precio_unitario))
      .toFixed(2);

    if (this.precios.length >= 1) {
      this.subtotal = this.precios.reduce(this.reducer);
    }

    this.configTableResultado(this.igv);
  }

  removeRow(element) {
    this.listadoItems = this.listadoItems.filter(e => {
      return e != element;
    });

    if (this.listadoItems.length <= 0) { this.regOrdenCompraForm.controls.items.reset(); }

    this.dataSource = new MatTableDataSource(this.listadoItems);

    this.elemento_borrado = parseFloat(
      (
        parseFloat(element.cantidad) * parseFloat(element.precio_unitario)
      ).toFixed(2)
    );

    if (this.precios.length >= 1) {
      this.subtotal = this.precios.reduce(this.reducer);
    }
    if (this.precios.length == 0) {
      this.subtotal = 0;
      this.elemento_borrado = 0;
      this.igv = 0;
    }

    this.displayedColumns_igv = ["titles", "costos"];
    this.transactions = [
      { item: "Subtotal", cost: this.subtotal - this.elemento_borrado },
      { item: "Descuentos", cost: this.descuento },
      {
        item: "IGV",
        cost: this.igv * (this.subtotal - this.elemento_borrado)
      }
    ];
    2;
    for (var i = 0; i < this.precios.length; i++) {
      if (this.precios[i] === this.elemento_borrado) {
        this.precios.splice(i, 1);
        break;
      }
    }
  }

  configTableResultado(igv) {
    if (this.precios.length == 0) {
      this.subtotal = 0;
      this.igv = 0;
    }
    this.igv = igv;
    this.displayedColumns_igv = ["titles", "costos"];

    this.transactions = [
      { item: "Subtotal", cost: this.subtotal },
      //{ item: "Descuentos", cost: this.descuento },
      { item: "IGV", cost: this.igv * this.subtotal }
    ];
  }

  /** Gets the total cost of all transactions. */
  getTotalCost() {
    return this.transactions
      .map(t => t.cost)
      .reduce((acc, value) => !!this.igvCheck ? acc + value : this.transactions[0].cost, 0);
  }

}
