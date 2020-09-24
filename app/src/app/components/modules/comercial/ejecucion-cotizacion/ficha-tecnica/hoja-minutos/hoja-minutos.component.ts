import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { MatDialog } from '@angular/material';
import { ModalEstimacionesComponent } from './modal-estimaciones/modal-estimaciones.component';
import { ModalOperacionesComponent } from './modal-operaciones/modal-operaciones.component';
import { ComercialService } from 'src/app/services/comercial.service';
import { HojaMinutosModel } from 'src/app/models/hojaMinutos.model';
import { ActivatedRoute } from '@angular/router';
import { HojaMinutosOperacionesModel } from 'src/app/models/hojaMinutosOperaciones.model';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { TokenService } from 'src/app/services/token.service';
import io from 'socket.io-client';
import { socketURL } from 'src/app/app.uri.js';
import { ModalMaquinasComponent } from './modal-maquinas/modal-maquinas.component';
import { MaquinasModel } from 'src/app/models/maquinas.model';
import { ModalResumenComponent } from './modal-resumen/modal-resumen.component';
import { AlertHelper } from 'src/app/_helpers/alert.helper';
import { ButtonHelper } from 'src/app/_helpers/button.helper';

@Component({
  selector: 'app-hoja-minutos',
  templateUrl: './hoja-minutos.component.html',
  styleUrls: ['./hoja-minutos.component.scss']
})

export class HojaMinutosComponent implements OnInit {
  alertSwal: AlertHelper = new AlertHelper();
  buttonHelper: ButtonHelper = new ButtonHelper();
  regHojaMinutosForm: FormGroup;
  hojaMinutos: HojaMinutosModel;
  cotizacionID: number;
  operaciones: HojaMinutosOperacionesModel[] = [];
  hojaMinutoID: number;
  socket: any;
  totalTSOperaciones: number = 0;
  doModals: boolean = false;
  maquinas: MaquinasModel[] = [];
  tpo_corte: any = '';
  tpo_acabados: any = '';
  formSaved: boolean = false;
  tallasTemp: string = '';

  spinnerButton: MatProgressButtonOptions = this.buttonHelper.getSpinnerButton('Guardar');

  constructor(
    private formBuilder: FormBuilder,
    public Dialog: MatDialog,
    private ComercialService: ComercialService,
    private route: ActivatedRoute,
    private TokenService: TokenService,
  ) {
    this.socket = io(socketURL);
  }

  ngOnInit(): void {
    this.configFormulario();
    this.init();
    this.loadMaquinaOperaciones();
    this.listenSockets();
    this.observableForm();
  }

  init() {
    this.route.params.subscribe(params => {
      this.cotizacionID = params['id'];
      this.listarHojaMinutos(this.cotizacionID);
    });
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

  listenSockets() {
    this.socket.on('cast_registrarFichaTecnica', data => {
      this.init();
    })
  }

  observableForm(): void {
    this.regHojaMinutosForm.statusChanges.subscribe((result) => {
      if (result == 'INVALID') {
        this.spinnerButton.disabled = true;
      }
      if (result == 'VALID') {
        this.spinnerButton.disabled = false;
      }
    });

    this.regHojaMinutosForm.controls.jornada.valueChanges.subscribe((text) => {
      let rs = !!Number(text) ? Number(text) * 60 : 0;
      this.regHojaMinutosForm.controls.minutos_turno.setValue(rs);
    })
  }

  listarHojaMinutos(id): void {
    this.ComercialService.ListarHojaMinutos(id).subscribe((response) => {
      if (response.type == 'success' &&
        Object.keys(response.data).length > 0) {
        this.procesarTallas(response.data.tallas);
        this.initForm(response.data.hoja_minutos, response.data.cotizacion);
        this.initOperacionModal();
      }
    }, error => console.log(error));
  }

  procesarTallas(tallas) {
    tallas.map(talla => this.tallasTemp += talla.medida + '-');
    this.tallasTemp = this.tallasTemp.slice(0, -1);
  }

  initForm(hm, cot) {
    this.hojaMinutoID = hm.id;

    this.regHojaMinutosForm.controls.cliente.setValue(cot.cli_nombre);
    this.regHojaMinutosForm.controls.estilo.setValue(cot.estilo);
    this.regHojaMinutosForm.controls.complemento1.setValue(cot.complemento1);
    this.regHojaMinutosForm.controls.complemento2.setValue(cot.complemento2);
    this.regHojaMinutosForm.controls.complemento3.setValue(cot.complemento3);
    this.regHojaMinutosForm.controls.complemento4.setValue(cot.complemento4);
    this.regHojaMinutosForm.controls.fecha.setValue(moment(cot.created_at.split(" ")[0]).locale('es').format("LL"));
    this.regHojaMinutosForm.controls.tallas.setValue(this.tallasTemp);
    this.regHojaMinutosForm.controls.analista.setValue(!!hm.analista ? hm.analista : this.TokenService.GetPayload().nombre);

    if (Object.keys(hm).length > 0) {
      this.regHojaMinutosForm.controls.po.setValue(hm.po);
      this.regHojaMinutosForm.controls.tipo_prenda.setValue(hm.tipo_prenda);
      this.regHojaMinutosForm.controls.tela_cuerpo_1.setValue(hm.tela_cuerpo_1);
      this.regHojaMinutosForm.controls.tela_cuerpo_2.setValue(hm.tela_cuerpo_2);
      this.regHojaMinutosForm.controls.artes.setValue(hm.artes);
      this.regHojaMinutosForm.controls.acabados.setValue(hm.acabados);
      this.regHojaMinutosForm.controls.jornada.setValue(hm.jornada);
      this.regHojaMinutosForm.controls.operarios.setValue(hm.operarios);
      this.regHojaMinutosForm.controls.minutos_turno.setValue((!!hm.jornada) ? Number(hm.jornada) * 60 : 0);
      this.regHojaMinutosForm.controls.total_ts_maq.setValue(!!hm.total_ts_maq ? hm.total_ts_maq : 0);
      this.regHojaMinutosForm.controls.meta.setValue(hm.meta);
      this.regHojaMinutosForm.controls.eficiencia.setValue(hm.eficiencia);
      this.regHojaMinutosForm.controls.estimaciones.setValue({ quiero_sacar: hm.quiero_sacar, si_tengo: hm.si_tengo });
      this.tpo_corte = hm.tpo_corte;
      this.tpo_acabados = hm.tpo_acabados;
    } else {
      this.regHojaMinutosForm.controls.estimaciones.setValue({ quiero_sacar: '', si_tengo: '' });
    }

  }

  initOperacionModal() {
    if (this.hojaMinutoID === undefined) { return; }
    this.ComercialService.ListarHojaMinutosOperaciones(this.hojaMinutoID).subscribe((response) => {
      if (response.data.length > 0) {
        for (let item of response.data) {
          let hom: HojaMinutosOperacionesModel = new HojaMinutosOperacionesModel();
          hom.bloque = item.bloque;
          hom.operacion = item.operacion;
          hom.id_maquina = item.id_maquina;
          hom.ts = item.ts;
          hom.cat = item.cat;
          hom.id_hoja_minutos = item.id_hoja_minutos;

          this.operaciones.push(hom);
        }
        this.processTotalTS();
      }

    }, error => console.log(error));
  }

  processTotalTS() {
    this.totalTSOperaciones = 0;
    let item = this.regHojaMinutosForm.value;
    if (this.operaciones.length > 0) {
      this.operaciones.map((operacion) => {
        this.totalTSOperaciones += parseFloat(operacion.ts);
      });
      this.regHojaMinutosForm.controls.total_ts_maq.setValue(this.totalTSOperaciones.toFixed(4));
      this.regHojaMinutosForm.controls.meta.setValue(
        Math.round((((item.operarios * item.minutos_turno) / this.totalTSOperaciones) * item.eficiencia) / 100)
      );

    } else {
      this.regHojaMinutosForm.controls.total_ts_maq.setValue(0);
      this.regHojaMinutosForm.controls.meta.reset();
    }
  }

  configFormulario(): void {
    this.regHojaMinutosForm = this.formBuilder.group({
      cliente: [''],
      estilo: [''],
      analista: [''],
      fecha: [''],
      po: [''],
      tipo_prenda: [''],
      tela_cuerpo_1: [''],
      tela_cuerpo_2: [''],
      complemento1: [''],
      complemento2: [''],
      complemento3: [''],
      complemento4: [''],
      artes: [''],
      acabados: [''],
      tallas: [''],
      jornada: [''],
      operarios: [''],
      eficiencia: ['', [Validators.max(100)]],
      minutos_turno: [''],
      total_ts_maq: [''],
      meta: [''],
      estimaciones: ['']
    })
  }

  setHojaMinutosRegistrar(data): HojaMinutosModel {
    let hojaMinutos = new HojaMinutosModel();
    hojaMinutos.cotizacion_id = this.cotizacionID;
    hojaMinutos.analista = data.analista;
    hojaMinutos.fecha = data.fecha;
    hojaMinutos.po = data.po;
    hojaMinutos.tipo_prenda = data.tipo_prenda;
    hojaMinutos.tela_cuerpo_1 = data.tela_cuerpo_1;
    hojaMinutos.tela_cuerpo_2 = data.tela_cuerpo_2;
    hojaMinutos.artes = data.artes;
    hojaMinutos.acabados = data.acabados;
    hojaMinutos.tallas = data.tallas;
    hojaMinutos.jornada = data.jornada;
    hojaMinutos.operarios = data.operarios;
    hojaMinutos.eficiencia = data.eficiencia;
    hojaMinutos.quiero_sacar = data.estimaciones.quiero_sacar;
    hojaMinutos.si_tengo = data.estimaciones.si_tengo;
    hojaMinutos.tpo_corte = this.tpo_corte;
    hojaMinutos.tpo_acabados = this.tpo_acabados;

    return hojaMinutos;
  }

  registrarHojaMinutos(): void {
    if (!this.regHojaMinutosForm.valid || this.formSaved) {
      return;
    }
    this.formSaved = true;
    this.hojaMinutos = this.setHojaMinutosRegistrar(this.regHojaMinutosForm.value);

    this.ComercialService.RegistrarHojaMinutos(this.hojaMinutos).subscribe((response) => {
      if (this.operaciones.length > 0) {
        let id = response.data.id_hoja_minutos;
        for (let item of this.operaciones) {
          item.id_hoja_minutos = id;
        }
        this.ComercialService.RegistrarHojaMinutosOperaciones(this.operaciones).subscribe((response) => {
          this.alertSwal.showSwalMessage(response);
          this.cancelarForm(response.type);
        }, error => {
          this.alertSwal.showSwalErrorMessage(error);
          this.cancelarForm('error');
        })
      } else {
        this.alertSwal.showSwalMessage(response);
        this.cancelarForm(response.type);
      }
    }, error => {
      this.alertSwal.showSwalErrorMessage(error);
      this.cancelarForm('error');
    });
  }

  cancelarForm(type) {
    if (type == 'success') { }
    this.formSaved = false;
  }
  openModalEstimaciones(): void {
    const dialogRef = this.Dialog.open(ModalEstimacionesComponent, {
      data: {
        frm: this.regHojaMinutosForm.controls.estimaciones.value,
        totalTsMaq: this.regHojaMinutosForm.controls.total_ts_maq.value,
        minutoTurno: this.regHojaMinutosForm.controls.minutos_turno.value
      },
      disableClose: true,
      position: {},
    });

    dialogRef.afterClosed().subscribe((e) => {
      if (e !== undefined) {
        this.regHojaMinutosForm.controls.estimaciones.setValue(e);
      }
    });
  }

  openModalOperaciones(): void {
    const dialogRef = this.Dialog.open(ModalOperacionesComponent, {
      data: {
        operaciones: this.operaciones,
        puestoTeorico: {
          minutoTurno: this.regHojaMinutosForm.controls.minutos_turno.value,
          operarios: !!this.regHojaMinutosForm.controls.operarios.value ?
            Number(this.regHojaMinutosForm.controls.operarios.value) : 0,
          eficiencia: !!this.regHojaMinutosForm.controls.eficiencia.value ?
            Number(this.regHojaMinutosForm.controls.eficiencia.value) : 0,
          totalTSMaq: this.totalTSOperaciones,
        },
        maquinas: this.maquinas
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

        this.operaciones = [];
        for (let item of e) {
          let op = new HojaMinutosOperacionesModel();
          op.bloque = item.bloque;
          op.operacion = item.operacion;
          op.id_maquina = item.id_maquina;
          op.ts = item.ts;
          op.cat = item.cat;
          this.operaciones.push(op);
        }
        this.processTotalTS();

      }
    })
  }

  openModalMaquinas(): void {
    const dialogRef = this.Dialog.open(ModalMaquinasComponent, {
      data: {
        operaciones: this.operaciones,
        maquinas: this.maquinas,
        eficiencia: this.regHojaMinutosForm.controls.eficiencia.value,
        totalTsMaq: this.regHojaMinutosForm.controls.total_ts_maq.value,
        operarios: this.regHojaMinutosForm.controls.operarios.value,
        minutoTurnos: this.regHojaMinutosForm.controls.minutos_turno.value,
      },
      disableClose: true,
      position: {
        top: '50px',
      },
      maxWidth: '100vw !important',
      minWidth: '100vw !important'
    });

    dialogRef.afterClosed().subscribe((e) => {
      if (e !== undefined) { }
    });
  }

  openModalResumen(): void {
    const dialogRef = this.Dialog.open(ModalResumenComponent, {
      data: {
        tpo_corte: this.tpo_corte,
        tpo_acabados: this.tpo_acabados,
        tiempo_costura: this.totalTSOperaciones,
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((e) => {
      if (e !== undefined) {
        this.tpo_corte = e.tpo_corte;
        this.tpo_acabados = e.tpo_acabados;
      }
    })
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      if (charCode == 46) { return true; }
      return false;
    }
    return true;
  }

}
