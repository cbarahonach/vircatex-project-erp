import { Component, OnInit } from '@angular/core';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalHojaCotizacionRutasComponent } from './modal-hoja-cotizacion-rutas/modal-hoja-cotizacion-rutas.component';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ComercialService } from 'src/app/services/comercial.service';
import { CotizacionesModel } from 'src/app/models/cotizaciones.model';
import * as moment from 'moment';
import 'moment/min/locales';
import { ModalHojaCotizacionSecuenciasComponent } from './modal-hoja-cotizacion-secuencias/modal-hoja-cotizacion-secuencias.component';
import { ModalHojaCotizacionAviosComponent } from './modal-hoja-cotizacion-avios/modal-hoja-cotizacion-avios.component';
import { ModalHojaCotizacionImgComponent } from './modal-hoja-cotizacion-img/modal-hoja-cotizacion-img.component';
import Swal from 'sweetalert2';
import io from 'socket.io-client';
import { socketURL } from 'src/app/app.uri.js';
import { MaquinasModel } from 'src/app/models/maquinas.model';
import { CotizacionesFTHojaCotizacionModel } from 'src/app/models/cotizacionesFTHojaCotizacion.model';
import { CotizacionesFTHojaCotizacionRutasModel } from 'src/app/models/cotizacionesFTHojaCotizacionRutas.model';
import { CotizacionesFTHojaCotizacionSecuenciasModel } from 'src/app/models/cotizacionesFTHojaCotizacionSecuencias.model';
import { CotizacionesFTHojaCotizacionAviosModel } from 'src/app/models/cotizacionesFTHojaCotizacionAvios.model';
import { AlertHelper } from 'src/app/_helpers/alert.helper';
import { ButtonHelper } from 'src/app/_helpers/button.helper';

@Component({
  selector: 'app-hoja-cotizacion',
  templateUrl: './hoja-cotizacion.component.html',
  styleUrls: ['./hoja-cotizacion.component.scss']
})
export class HojaCotizacionComponent implements OnInit {
  alertSwal: AlertHelper = new AlertHelper();
  buttonHelper: ButtonHelper = new ButtonHelper();
  cotizacion: CotizacionesModel;
  hojaCotizacion: CotizacionesFTHojaCotizacionModel = new CotizacionesFTHojaCotizacionModel;
  hojaCotizacionImagenes: any = {};
  hojaCotizacionRutas: Array<CotizacionesFTHojaCotizacionRutasModel> = [];
  hojaCotizacionSecuencias: Array<CotizacionesFTHojaCotizacionSecuenciasModel> = [];
  hojaCotizacionAvios: Array<CotizacionesFTHojaCotizacionAviosModel> = [];
  helperCot: any = {};
  imgDBObj: any;
  regHojaCotizacionForm: FormGroup;
  maquinas: MaquinasModel[] = [];
  socket: any;
  formSaved: boolean = false;
  tallasTemp = '';

  spinnerButton: MatProgressButtonOptions = this.buttonHelper.getSpinnerButton('Guardar');

  constructor(
    private formBuilder: FormBuilder,
    private Dialog: MatDialog,
    private route: ActivatedRoute,
    private ComercialService: ComercialService,
    private router: Router,
  ) {
    this.socket = io(socketURL);
  }

  ngOnInit() {
    this.configurarFormulario();
    this.listenSockets();
    this.init();
    this.loadMaquinaOperaciones();

    this.regHojaCotizacionForm.statusChanges.subscribe(
      result => (result == 'VALID') ?
        this.spinnerButton.disabled = false : this.spinnerButton.disabled = true
    );
  }

  listenSockets() {
    this.socket.on('cast_registrarFichaTecnica', data => {
      this.init();
    })
  }

  init() {
    this.route.params.subscribe(params => {
      this.buscarCotizacion(params['id']);
    });
  }


  buscarCotizacion(id) {
    this.ComercialService.BuscarCotizacionPorId(id).subscribe((response) => {
      if (response.type == 'error') { this.router.navigate(['/Comercial/ejecucion-cotizacion']) }
      if (response.type == 'success') {
        this.loadCotizacion(response.data.cotizacion, response.data.tallas);
        this.loadHojaCotizacion(response.data.hoja_cotizacion);
        this.loadHojaCotizacionRutas(response.data.hoja_cotizacion_rutas);
        this.loadHojaCotizacionAvios(response.data.hoja_cotizacion_avios);
        this.loadHojaCotizacionSecuencias(response.data.hoja_cotizacion_secuencias);
        this.loadForm(response.data.cotizacion.cli_nombre, response.data.cotizacion.div_nombre);
        this.helperCot = response.data;
        this.imgDBObj = (response.data.hcot_img != null) ? JSON.parse(response.data.hcot_img) : [];
      }
    }, err => console.log(err));
  }

  configurarFormulario() {
    this.regHojaCotizacionForm = this.formBuilder.group({
      cliente: [''],
      division: [''],
      fecha_cotizacion: [''],
      fecha_actualizacion: [''],
      estilo_cliente: [''],
      complemento1: [''],
      complemento2: [''],
      complemento3: [''],
      complemento4: [''],
      descripcion: [''],
      tela: [''],
      estilo_interno: [''],
      tallas: [''],
      proceso: [''],
    });

  }

  loadCotizacion(data, tallas) {
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

    tallas.map(talla => this.tallasTemp += talla.medida + '-');
    this.tallasTemp = this.tallasTemp.slice(0, -1);

  }

  loadHojaCotizacion(hc) {
    if (Object.keys(hc).length <= 0) { return; }

    this.hojaCotizacion.cotizacion_id = hc.cotizacion_id;
    this.hojaCotizacion.descripcion = hc.descripcion;
    this.hojaCotizacion.estilo_interno = hc.estilo_interno;
    this.hojaCotizacion.proceso = hc.proceso;
    this.hojaCotizacion.imagen1 = hc.imagen1;
    this.hojaCotizacion.imagen2 = hc.imagen2;
    this.hojaCotizacion.imagen3 = hc.imagen3;

    this.regHojaCotizacionForm.controls.descripcion.setValue(this.hojaCotizacion.descripcion);
    this.regHojaCotizacionForm.controls.estilo_interno.setValue(this.hojaCotizacion.estilo_interno);
    this.regHojaCotizacionForm.controls.proceso.setValue(this.hojaCotizacion.proceso);
  }

  loadHojaCotizacionRutas(rutas) {
    if (rutas.length <= 0) { return; }

    this.hojaCotizacionRutas = [];
    for (let ruta of rutas) {
      let item = new CotizacionesFTHojaCotizacionRutasModel();
      item.cotizacion_id = ruta.cotizacion_id;
      item.rutas = ruta.rutas;
      item.observacion = ruta.observacion;
      item.deleted_status = ruta.deleted_status;

      this.hojaCotizacionRutas.push(item);
    }
  }

  loadHojaCotizacionAvios(avios) {
    if (avios.length <= 0) { return; }

    this.hojaCotizacionAvios = [];
    for (let item of avios) {
      let i = new CotizacionesFTHojaCotizacionAviosModel();
      i.cotizacion_id = item.cotizacion_id;
      i.descripcion = item.descripcion;
      i.consumo = item.consumo;
      i.unidad_medida = item.unidad_medida;

      this.hojaCotizacionAvios.push(i);
    }
  }

  loadHojaCotizacionSecuencias(secuencias) {
    if (secuencias.length <= 0) { return; }

    this.hojaCotizacionSecuencias = [];
    for (let secuencia of secuencias) {
      let item = new CotizacionesFTHojaCotizacionSecuenciasModel();
      item.cotizacion_id = secuencia.cotizacion_id;
      item.secuencia = secuencia.secuencia;
      item.descripcion = secuencia.descripcion;
      item.merma = secuencia.merma;
      item.maquina_id = secuencia.maquina_id;
      item.puntadas = secuencia.puntadas;

      this.hojaCotizacionSecuencias.push(item);
    }
  }

  loadForm(cliente, division) {
    this.regHojaCotizacionForm.controls.cliente.setValue(cliente);
    this.regHojaCotizacionForm.controls.division.setValue(division);
    this.regHojaCotizacionForm.controls.fecha_cotizacion.setValue(this.setDate(this.cotizacion.created_at));
    this.regHojaCotizacionForm.controls.fecha_actualizacion.setValue(this.setDate(this.cotizacion.updated_at));
    this.regHojaCotizacionForm.controls.estilo_cliente.setValue(this.cotizacion.estilo);
    this.regHojaCotizacionForm.controls.tela.setValue(`${this.cotizacion.tipo_tela} - ${this.cotizacion.composicion_tela}`);
    this.regHojaCotizacionForm.controls.complemento1.setValue(this.cotizacion.complemento1);
    this.regHojaCotizacionForm.controls.complemento2.setValue(this.cotizacion.complemento2);
    this.regHojaCotizacionForm.controls.complemento3.setValue(this.cotizacion.complemento3);
    this.regHojaCotizacionForm.controls.complemento4.setValue(this.cotizacion.complemento4);
    this.regHojaCotizacionForm.controls.tallas.setValue(this.tallasTemp);
  }

  setDate(time) {
    if (time.length <= 0) { return ''; }
    return moment(time.split(" ")[0]).locale('es').format("LL")
  }

  loadMaquinaOperaciones(): void {
    this.ComercialService.ListarMaquinasOperaciones().subscribe((response) => {
      this.maquinas = [];
      for (let item of response.data) {
        let maq = new MaquinasModel();
        maq.id = item.id;
        maq.nombre = item.nombre;
        maq.tipo = item.tipo;

        this.maquinas.push(maq);

      }
    }, error => console.log(error));
  }

  openDialogImg(): void {
    const dialogRef = this.Dialog.open(ModalHojaCotizacionImgComponent, {
      data: {
        hc: this.hojaCotizacion,
        tmp: this.hojaCotizacionImagenes
      },
      disableClose: true,
      position: {
        top: '50px',
      },
      maxWidth: '100vw !important',
      minWidth: '100vw !important'
    });

    dialogRef.afterClosed().subscribe((e) => {
      if (e !== undefined) {
        this.hojaCotizacionImagenes = e;
        //this.regHojaCotizacionForm.controls.imagenes.setValue(e);
      }
    });
  }

  openDialogRutas(): void {
    const dialogRef = this.Dialog.open(ModalHojaCotizacionRutasComponent, {
      data: { rutas: this.hojaCotizacionRutas },
      disableClose: true,
      position: {
        top: '50px',
      },
      maxWidth: '100vw !important',
      minWidth: '100vw !important'
    });

    dialogRef.afterClosed().subscribe((e: Array<CotizacionesFTHojaCotizacionRutasModel>) => {
      if (e !== undefined) {
        this.hojaCotizacionRutas = e;
      }
    });
  }

  openDialogAvios(): void {
    const dialogRef = this.Dialog.open(ModalHojaCotizacionAviosComponent, {
      data: { avios: this.hojaCotizacionAvios },
      disableClose: true,
      position: {
        top: '50px',
      },
      maxWidth: '100vw !important',
      minWidth: '100vw !important'
    });

    dialogRef.afterClosed().subscribe((e: Array<CotizacionesFTHojaCotizacionAviosModel>) => {
      if (e !== undefined) {
        this.hojaCotizacionAvios = e;
      }
    });
  }

  openDialogSecuencias(): void {
    const dialogRef = this.Dialog.open(ModalHojaCotizacionSecuenciasComponent, {
      data: {
        maquinas: this.maquinas,
        secuencias: this.hojaCotizacionSecuencias,
      },
      disableClose: true,
      position: {
        top: '50px',
      },
      maxWidth: '100vw !important',
      minWidth: '100vw !important'
    });

    dialogRef.afterClosed().subscribe((e: Array<CotizacionesFTHojaCotizacionSecuenciasModel>) => {
      if (e !== undefined) {
        this.hojaCotizacionSecuencias = e;
      }
    });
  }

  setHojaCotizacion() {
    this.hojaCotizacion.descripcion = this.regHojaCotizacionForm.controls.descripcion.value;
    this.hojaCotizacion.estilo_interno = this.regHojaCotizacionForm.controls.estilo_interno.value;
    this.hojaCotizacion.proceso = this.regHojaCotizacionForm.controls.proceso.value;

  }

  setCotizacionComplementos() {
    this.cotizacion.complemento1 = this.regHojaCotizacionForm.controls.complemento1.value;
    this.cotizacion.complemento2 = this.regHojaCotizacionForm.controls.complemento2.value;
    this.cotizacion.complemento3 = this.regHojaCotizacionForm.controls.complemento3.value;
    this.cotizacion.complemento4 = this.regHojaCotizacionForm.controls.complemento4.value;

  }

  cancelarForm(type) {
    if (type == 'success') {
      this.socket.emit('listen_registrarFichaTecnica', { type: 'refresh', section: 'hoja-cotizacion' });
    }
    this.spinnerButton.disabled = false;
    this.formSaved = false;

  }

  registrarHojaCotizacion() {
    this.setCotizacionComplementos()
    this.setHojaCotizacion();

    this.ComercialService
      .RegistrarFTHojaCotizacion(
        this.cotizacion, this.hojaCotizacion,
        this.hojaCotizacionImagenes, this.hojaCotizacionRutas,
        this.hojaCotizacionAvios, this.hojaCotizacionSecuencias)
      .subscribe((response) => {
        this.alertSwal.showSwalMessage(response);
        this.cancelarForm(response.type);
      }, err => {
        this.alertSwal.showSwalErrorMessage(err);
        this.cancelarForm('error');
      });
  }
}
