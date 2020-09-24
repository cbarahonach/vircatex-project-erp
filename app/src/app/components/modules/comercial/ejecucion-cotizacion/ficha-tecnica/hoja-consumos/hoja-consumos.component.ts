import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { CotizacionesModel } from "src/app/models/cotizaciones.model";
import { ComercialService } from "src/app/services/comercial.service";
import { Router, ActivatedRoute } from "@angular/router";
import * as moment from "moment";
import { MatProgressButtonOptions } from "mat-progress-buttons";
import { Subject } from "rxjs";
import { MatDialog } from "@angular/material";
import { ModalHojaConsumosTallasComponent } from "./modal-hoja-consumos-tallas/modal-hoja-consumos-tallas.component";
import { ModalHojaConsumosCorteComponent } from "./modal-hoja-consumos-corte/modal-hoja-consumos-corte.component";
import Swal from "sweetalert2";
import io from "socket.io-client";
import { socketURL } from "src/app/app.uri.js";
import { CotizacionesFTHojaCotizacionModel } from 'src/app/models/cotizacionesFTHojaCotizacion.model';
import { CotizacionesFTHojaConsumoModel } from 'src/app/models/cotizacionesFTHojaConsumo.model';
import { CotizacionesTextilModel } from 'src/app/models/cotizacionesTextil.model';
import { AlertHelper } from 'src/app/_helpers/alert.helper';
import { ButtonHelper } from 'src/app/_helpers/button.helper';

class Tallas {
  medida: string;
  cantidad: number;
}

@Component({
  selector: "app-hoja-consumos",
  templateUrl: "./hoja-consumos.component.html",
  styleUrls: ["./hoja-consumos.component.scss"]
})
export class HojaConsumosComponent implements OnInit {
  protected _onDestroy = new Subject<void>();
  alertSwal: AlertHelper = new AlertHelper();
  buttonHelper: ButtonHelper = new ButtonHelper();
  regHojaConsumosForm: FormGroup;
  cotizacion_id: number = 0;
  cotizacion: CotizacionesModel;
  hojaCotizacion: CotizacionesFTHojaCotizacionModel;
  hojaConsumo: CotizacionesFTHojaConsumoModel;
  tallas: Array<Tallas> = [];
  imagenMiniatura: any = {};
  textiles: Array<CotizacionesTextilModel> = [];
  telasContainer: Array<any> = [];
  totalCurvas: number = 0;

  dbtLTizado: any[] = [];
  dbtTolerancia: any[] = [];
  cmpComponentes: any[] = [];
  cmpEficiencia: any[] = [];
  cmpLTizado: any[] = [];
  cmpCNeto: any[] = [];
  cmpMCorte: any[] = [];

  socket: any;
  formSaved: boolean = false;

  spinnerButton: MatProgressButtonOptions = this.buttonHelper.getSpinnerButton('Guardar');

  constructor(
    private formBuilder: FormBuilder,
    private ComercialService: ComercialService,
    private route: ActivatedRoute,
    private router: Router,
    private Dialog: MatDialog
  ) {
    this.socket = io(socketURL);
  }

  ngOnInit() {
    this.configForm();
    this.listenSockets();
    this.init();
  }

  configForm(): void {
    this.regHojaConsumosForm = this.formBuilder.group({
      cliente: [""],
      estilo_cliente: [""],
      fecha_cotizacion: [""],
      encogimiento_molde: [""],
      tela: [""],
      descripcion: [""],
      estilo_interno: [""],
      complemento_1: [""],
      complemento_2: [""],
      complemento_3: [""],
      complemento_4: [""],
      proceso: [""],
      dbt_tela_principal: [""],
      dbt_complemento_1: [""],
      dbt_complemento_2: [""],
      dbt_complemento_3: [""],
      dbt_complemento_4: [""],
      cmp_tela_principal: [""],
      cmp_complemento_1: [""],
      cmp_complemento_2: [""],
      cmp_complemento_3: [""],
      cmp_complemento_4: [""],
      miniatura_corte: [""]
    });
  }

  listenSockets() {
    this.socket.on("cast_registrarFichaTecnica", data => {
      this.init();
    });
  }

  init() {
    this.route.params.subscribe(params => {
      this.cotizacion_id = params["id"];
      this.buscarCotizacion(this.cotizacion_id);
    });

    this.regHojaConsumosForm.statusChanges.subscribe(
      result => (result == 'VALID') ?
        this.spinnerButton.disabled = false : this.spinnerButton.disabled = true
    );
  }


  buscarCotizacion(id): void {
    this.ComercialService.BuscarCotizacionFTConsumoPorId(id).subscribe(
      response => {
        if (response.type == "error") {
          this.router.navigate(["/Comercial/ejecucion-cotizacion"]);
        }
        if (response.type == "success") {
          this.loadCotizacion(response.data.cotizacion);
          this.loadHojaCotizacion(response.data.h_cotizacion);
          this.loadHojaConsumo(response.data.h_consumos);
          this.loadTallas(response.data.tallas);
          this.loadTextiles(response.data.textiles);
          this.setInputsForm(response.data);
        }
      },
      err => console.log(err)
    );
  }

  loadTextiles(textiles: Array<CotizacionesTextilModel>) {
    for (let textil of textiles) {
      let item = new CotizacionesTextilModel();
      item.cotizacion_id = textil.cotizacion_id;
      item.tipo = textil.tipo;
      item.articulo = !!textil.articulo ? textil.articulo : '';
      item.color = !!textil.color ? textil.color : '';
      item.titulo_tela = !!textil.titulo_tela ? textil.titulo_tela : '';
      item.ancho_total = !!textil.ancho_total ? textil.ancho_total : '';
      item.densidad_aw = !!textil.densidad_aw ? textil.densidad_aw : '';
      item.densidad_bw = !!textil.densidad_bw ? textil.densidad_bw : '';
      item.proveedor = !!textil.proveedor ? textil.proveedor : '';
      item.revirado = !!textil.revirado ? textil.revirado : '';
      item.encogimiento_largo = !!textil.encogimiento_largo ? textil.encogimiento_largo : '';
      item.encogimiento_ancho = !!textil.encogimiento_ancho ? textil.encogimiento_ancho : '';
      item.precio = !!textil.precio ? textil.precio : '';
      item.largo_tizado_a = !!textil.largo_tizado_a ? textil.largo_tizado_a : '';
      item.tolerancia = !!textil.tolerancia ? textil.tolerancia : '';
      item.componente = !!textil.componente ? textil.componente : '';
      item.eficiencia = !!textil.eficiencia ? textil.eficiencia : '';
      item.largo_tizado_b = !!textil.largo_tizado_b ? textil.largo_tizado_b : '';
      item.consumo_neto = !!textil.consumo_neto ? textil.consumo_neto : '';
      item.merma_corte = !!textil.merma_corte ? textil.merma_corte : '';

      this.textiles[item.tipo] = item;
    }

    this.loadVariablesTable(this.textiles);
  }

  loadVariablesTable(items: Array<CotizacionesTextilModel>) {
    for (let index in items) {
      let item = items[index];
      this.dbtLTizado[item.tipo] = item.largo_tizado_a;
      this.dbtTolerancia[item.tipo] = item.tolerancia;
      this.cmpComponentes[item.tipo] = item.componente;
      this.cmpEficiencia[item.tipo] = item.eficiencia;
      this.cmpLTizado[item.tipo] = item.largo_tizado_b;
      this.cmpCNeto[item.tipo] = item.consumo_neto;
      this.cmpMCorte[item.tipo] = item.merma_corte;
    }
  }

  loadCotizacion(data) {
    this.cotizacion = new CotizacionesModel();

    this.cotizacion.id = data.id;
    this.cotizacion.cliente_id = data.cliente_id;
    this.cotizacion.usuario_id = data.usuario_id;
    this.cotizacion.temporada_id = data.temporada_id;
    this.cotizacion.codigo = data.codigo;
    this.cotizacion.estilo = data.estilo;
    this.cotizacion.tipo_tela = data.tipo_tela;
    this.cotizacion.composicion_tela = data.composicion_tela;
    this.cotizacion.tp_archivo = data.tp_archivo;
    this.cotizacion.hm_archivo = data.hm_archivo;
    this.cotizacion.complemento1 = !!data.complemento1 ? data.complemento1 : '';
    this.cotizacion.complemento2 = !!data.complemento2 ? data.complemento2 : '';
    this.cotizacion.complemento3 = !!data.complemento3 ? data.complemento3 : '';
    this.cotizacion.complemento4 = !!data.complemento4 ? data.complemento4 : '';
    this.cotizacion.created_at = data.created_at;
    this.cotizacion.updated_at = !!data.updated_at ? data.updated_at : '';

    /* -- Telas container */
    this.telasContainer[0] = { componente: 'Tela principal', tela: data.tipo_tela + ' - ' + data.composicion_tela };
    this.telasContainer[1] = { componente: 'Complemento A', tela: !!data.complemento1 ? data.complemento1 : '' };
    this.telasContainer[2] = { componente: 'Complemento B', tela: !!data.complemento2 ? data.complemento2 : '' };
    this.telasContainer[3] = { componente: 'Complemento C', tela: !!data.complemento3 ? data.complemento3 : '' };
    this.telasContainer[4] = { componente: 'Complemento D', tela: !!data.complemento4 ? data.complemento4 : '' };

  }

  readAttributesTable(position, type) {
    let rs = '';

    let item = this.textiles.filter((textil) => {
      return textil.tipo == position;
    })

    if (item.length <= 0) { return; }

    switch (type) {
      case 'at':
        rs = item[0].ancho_total;
        break;
      case 'aw':
        rs = item[0].densidad_aw;
        break;
      case 'bw':
        rs = item[0].densidad_bw;
        break;
      case 'el':
        rs = item[0].encogimiento_largo;
        break;
      case 'ea':
        rs = item[0].encogimiento_ancho;
        break;
      case 'rev':
        rs = item[0].revirado;
        break;
      case 'a_tizado':
        let ea = !!item[0].encogimiento_ancho ? (Number(item[0].encogimiento_ancho) / 100) : 0;

        if (this.hojaCotizacion.proceso == 'Paño lavado' && item[0].ancho_total.trim().length > 0) {
          rs = ((Number(item[0].ancho_total) - 0.03) * (1 - ea)).toFixed(2);
        } else if (this.hojaCotizacion.proceso == 'Corte directo' && item[0].ancho_total.trim().length > 0) {
          rs = (Number(item[0].ancho_total) - 0.03).toFixed(2).toString();
        } else if (item[0].ancho_total.trim().length <= 0) {
          rs = '';
        } else {
          rs = '0';
        }
        break;
    }

    return rs;
  }

  calcularConsumoLineal(largo_tizado) {
    if (!!largo_tizado == false) { return 0 }

    return (parseFloat(largo_tizado) / this.totalCurvas).toFixed(2);
  }

  calcularConsumoBruto(consumo_bruto, merma_corte) {
    if (!!consumo_bruto == false || !!merma_corte == false) { return 0 }

    return (parseFloat(consumo_bruto) * parseFloat(merma_corte)).toFixed(2);
  }

  loadHojaCotizacion(data) {
    this.hojaCotizacion = new CotizacionesFTHojaCotizacionModel();
    if (Object.keys(data).length <= 0) { return; }
    this.hojaCotizacion.cotizacion_id = data.cotizacion_id;
    this.hojaCotizacion.descripcion = data.descripcion;
    this.hojaCotizacion.estilo_interno = data.estilo_interno;
    this.hojaCotizacion.proceso = data.proceso;
  }

  loadHojaConsumo(data) {
    this.hojaConsumo = new CotizacionesFTHojaConsumoModel();
    if (Object.keys(data).length <= 0) { return; }

    this.hojaConsumo.cotizacion_id = data.cotizacion_id;
    this.hojaConsumo.encogimiento_molde = data.encogimiento_molde;
    this.hojaConsumo.minutaje_corte = data.minutaje_corte;
  }

  loadTallas(data) {
    if (data.length <= 0) { return; }

    for (let item of data) {
      let talla = new Tallas();
      talla.medida = item.medida;
      talla.cantidad = item.cantidad;

      this.tallas.push(talla);
    }

    this.tallas.map((talla) => {
      this.totalCurvas += parseFloat(talla.cantidad.toString());
    });

  }

  setInputsForm(data): void {
    this.regHojaConsumosForm.controls.fecha_cotizacion.setValue(
      moment(this.cotizacion.created_at.split(" ")[0])
        .locale("es")
        .format("LL")
    );
    this.regHojaConsumosForm.controls.cliente.setValue(
      data.cotizacion.cli_nombre
    );
    this.regHojaConsumosForm.controls.estilo_cliente.setValue(
      this.cotizacion.estilo
    );
    this.regHojaConsumosForm.controls.tela.setValue(
      `${this.cotizacion.tipo_tela} - ${this.cotizacion.composicion_tela}`
    );
    this.regHojaConsumosForm.controls.descripcion.setValue(
      this.hojaCotizacion.descripcion
    );
    this.regHojaConsumosForm.controls.estilo_interno.setValue(
      this.hojaCotizacion.estilo_interno
    );
    this.regHojaConsumosForm.controls.proceso.setValue(
      this.hojaCotizacion.proceso
    );
    this.regHojaConsumosForm.controls.complemento_1.setValue(
      this.cotizacion.complemento1
    );
    this.regHojaConsumosForm.controls.complemento_2.setValue(
      this.cotizacion.complemento2
    );
    this.regHojaConsumosForm.controls.complemento_3.setValue(
      this.cotizacion.complemento3
    );
    this.regHojaConsumosForm.controls.complemento_4.setValue(
      this.cotizacion.complemento4
    );
    this.regHojaConsumosForm.controls.encogimiento_molde.setValue(
      this.hojaConsumo.encogimiento_molde
    );
  }

  OpenDialogTallas() {
    const dialogRef = this.Dialog.open(ModalHojaConsumosTallasComponent, {
      data: this.tallas,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(e => { });
  }

  OpenDialogMiniaturaCorte() {
    const dialogRef = this.Dialog.open(ModalHojaConsumosCorteComponent, {
      data: {
        hc: this.hojaConsumo,
        tmp: this.imagenMiniatura
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(e => {
      if (e !== undefined) {
        this.imagenMiniatura = e;
      }
    });
  }

  saveInputsArray(): Array<CotizacionesTextilModel> {
    for (let index in this.telasContainer) {
      if (this.telasContainer[index].tela.trim().length > 0) {
        if (this.textiles[index] != undefined) {
          this.textiles[index].largo_tizado_a = !!this.dbtLTizado[index] ? this.dbtLTizado[index] : '';
          this.textiles[index].tolerancia = !!this.dbtTolerancia[index] ? this.dbtTolerancia[index] : '';
          this.textiles[index].componente = !!this.cmpComponentes[index] ? this.cmpComponentes[index] : '';
          this.textiles[index].eficiencia = !!this.cmpEficiencia[index] ? this.cmpEficiencia[index] : '';
          this.textiles[index].largo_tizado_b = !!this.cmpLTizado[index] ? this.cmpLTizado[index] : '';
          this.textiles[index].consumo_neto = !!this.cmpCNeto[index] ? this.cmpCNeto[index] : '';
          this.textiles[index].merma_corte = !!this.cmpMCorte[index] ? this.cmpMCorte[index] : '';
        } else {
          this.textiles[index] = new CotizacionesTextilModel();
          this.textiles[index].cotizacion_id = this.cotizacion_id;
          this.textiles[index].tipo = parseInt(index);
          this.textiles[index].largo_tizado_a = !!this.dbtLTizado[index] ? this.dbtLTizado[index] : '';
          this.textiles[index].tolerancia = !!this.dbtTolerancia[index] ? this.dbtTolerancia[index] : '';
          this.textiles[index].componente = !!this.cmpComponentes[index] ? this.cmpComponentes[index] : '';
          this.textiles[index].eficiencia = !!this.cmpEficiencia[index] ? this.cmpEficiencia[index] : '';
          this.textiles[index].largo_tizado_b = !!this.cmpLTizado[index] ? this.cmpLTizado[index] : '';
          this.textiles[index].consumo_neto = !!this.cmpCNeto[index] ? this.cmpCNeto[index] : '';
          this.textiles[index].merma_corte = !!this.cmpMCorte[index] ? this.cmpMCorte[index] : '';
        }
      }
    }

    return this.textiles;
  }

  cancelarForm(type) {
    if (type = 'success') { }

    this.formSaved = false;
  }

  registrarHojaConsumos() {
    this.hojaConsumo.cotizacion_id = this.cotizacion_id;
    this.hojaConsumo.encogimiento_molde = this.regHojaConsumosForm.controls.encogimiento_molde.value;
    let textiles = this.saveInputsArray();
    this.ComercialService.RegistrarFTHojaConsumo(this.hojaConsumo, this.imagenMiniatura, textiles)
      .subscribe((response) => {
        this.alertSwal.showSwalMessage(response);
        this.cancelarForm(response.type);
      }, err => {
        this.alertSwal.showSwalErrorMessage(err);
        this.cancelarForm('error'); 
      });
  }
}
