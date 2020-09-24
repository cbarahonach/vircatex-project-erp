import { Component, OnInit, ViewChild } from '@angular/core';
import { ComercialService } from 'src/app/services/comercial.service';
import { ClientesModel } from 'src/app/models/clientes.model';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { ReplaySubject, Subject } from 'rxjs';
import { MatSelect, MatDialog, MatSnackBar } from '@angular/material';
import { takeUntil } from 'rxjs/operators';
import { FileUploader } from 'ng2-file-upload';
import { appURL } from 'src/app/app.uri.js';
import { ModalSolicitudCotizacionComponent } from './modal-solicitud-cotizacion/modal-solicitud-cotizacion.component';
import { TokenService } from 'src/app/services/token.service';
import { CotizacionesModel } from 'src/app/models/cotizaciones.model';
import Swal from 'sweetalert2';
import { TallasModel } from 'src/app/models/tallas.model';
import { CotizacionesCurvaModel } from 'src/app/models/cotizacionesCurva.model';
import { AlertHelper } from 'src/app/_helpers/alert.helper';
import { ButtonHelper } from 'src/app/_helpers/button.helper';

@Component({
  selector: 'app-solicitud-cotizacion',
  templateUrl: './solicitud-cotizacion.component.html',
  styleUrls: ['./solicitud-cotizacion.component.scss']
})
export class SolicitudCotizacionComponent implements OnInit {
  breadcrumb: any = {
    title: "Modulo Comercial",
    items: [
      { name: "Inicio", route: "/home", redirectTo: true },
      { name: "Comercial", route: "/Comercial", redirectTo: true },
      { name: "Solicitud de cotización", route: "", redirectTo: false },
    ]
  };

  @ViewChild('myForm', { static: true }) myForm: NgForm;
  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;
  swalAlert: AlertHelper = new AlertHelper();
  buttonHelper: ButtonHelper = new ButtonHelper();
  cotizacion: CotizacionesModel;
  clientes: ClientesModel[];
  tallas: Array<TallasModel> = [];
  temporadas: any[];
  volumenes: any[];
  volumenSelected: any;
  uploader: FileUploader = new FileUploader({ url: appURL, disableMultipart: true });
  tpFileName: string = 'No hay archivos seleccionados.';
  tpFileNameSelected: string = '';
  hmFileName: string = 'No hay archivos seleccionados.';
  hmFileNameSelected: string = '';
  selectedHMFile: any = '';
  extensionHMFile: any;
  selectedTPFile: any = '';
  extensionTPFile: any;
  curvasSeleccionadas: Array<CotizacionesCurvaModel> = [];
  regcotizacionForm: FormGroup;
  clienteFiltrado: ReplaySubject<any> = new ReplaySubject<any>(1);
  temporadaFiltrado: ReplaySubject<any> = new ReplaySubject<any>(1);
  protected _onDestroy = new Subject<void>();
  formSaved: boolean = false;
  spinnerButton = this.buttonHelper.getSpinnerButton('Registrar');

  constructor(
    private TokenService: TokenService,
    private formBuilder: FormBuilder,
    private ComercialService: ComercialService,
    private Dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.configurarFormulario();
    this.listarUtilidades();
    this.onChanges();
  }

  onChanges() {
    this.regcotizacionForm.statusChanges.subscribe(
      result => (result == 'VALID') ?
        this.spinnerButton.disabled = false : this.spinnerButton.disabled = true
    );

    this.regcotizacionForm.controls.cliente.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        const clienteFiltrado = this.clientes.filter((cliente) => {
          return cliente.id === this.regcotizacionForm.controls.cliente.value;
        });
        this.buscarVolumen(clienteFiltrado);
      });

    this.regcotizacionForm.controls.clienteBuscador.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filtrarClientes();
      });

    this.regcotizacionForm.controls.temporadaBuscador.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filtrarTemporadas();
      });
  }

  filtrarClientes(): void {
    if (!this.clientes) {
      return;
    }
    let buscar = this.regcotizacionForm.controls.clienteBuscador.value;
    if (!buscar) {
      this.clienteFiltrado.next(this.clientes.slice());
      return;
    } else {
      buscar = buscar.toLowerCase();
    }
    this.clienteFiltrado.next(
      this.clientes.filter(cliente => cliente.nombre.toLowerCase().indexOf(buscar) > -1)
    );
  }

  filtrarTemporadas(): void {
    if (!this.temporadas) {
      return;
    }
    let buscar = this.regcotizacionForm.controls.temporadaBuscador.value;
    if (!buscar) {
      this.temporadaFiltrado.next(this.temporadas.slice());
      return;
    } else {
      buscar = buscar.toLowerCase();
    }
    this.temporadaFiltrado.next(
      this.temporadas.filter(temporada => temporada.nombre.toLowerCase().indexOf(buscar) > -1)
    );
  }

  listarUtilidades(): void {
    this.ComercialService.UtilidadesRegistrarCotizacion().subscribe((response) => {
      this.clientes = response.data.clientes;
      this.loadTallas(response.data.tallas);
      this.temporadas = response.data.temporadas;
      this.volumenes = response.data.volumenes;
      this.clienteFiltrado.next(this.clientes.slice());
      this.temporadaFiltrado.next(this.temporadas.slice());
    }, err => console.log(err));
  }

  loadTallas(tallas) {
    for (let item of tallas) {
      let talla = new TallasModel();
      talla.id = item.id;
      talla.medida = item.medida;
      talla.created_at = item.created_at;

      this.tallas.push(talla);
    }
  }

  buscarVolumen(cliente): void {
    if (cliente.length <= 0) { return; }

    let volumenCliente = cliente[0].volumen_id;
    this.volumenSelected = this.volumenes.filter((volumen) => {
      return volumen.id === volumenCliente;
    });
    this.regcotizacionForm.controls.volumen.setValue(this.volumenSelected[0].rango);
  }

  configurarFormulario(): void {
    this.regcotizacionForm = this.formBuilder.group({
      cliente: ['', [Validators.required,]],
      clienteBuscador: ['',],
      volumen: [''],
      temporada: ['', [Validators.required,]],
      temporadaBuscador: ['',],
      estilo: [''],
      tipoTela: [''],
      composicionTela: [''],
      compleTela1: ['',],
      compleTela2: ['',],
      compleTela3: ['',],
      compleTela4: ['',],
      curva: ['', [Validators.required,]]
    });
  }

  onTPSelected(event): void {
    if (event.length <= 0) { return; }
    const file: File = event[0];
    this.tpFileName = file.name;
    this.tpFileNameSelected = file.name;

    this.ReadAsBase64(file).then(result => {
      this.extensionTPFile = result.split(';')[0].split('/')[1];
      this.selectedTPFile = result;
    }).catch(err => console.log(err));
  }

  onHMSelected(event): void {
    if (event.length <= 0) { return; }
    const file: File = event[0];
    this.hmFileName = file.name;
    this.hmFileNameSelected = file.name;

    this.ReadAsBase64(file).then(result => {
      this.extensionHMFile = result.split(';')[0].split('/')[1];
      this.selectedHMFile = result;
    }).catch(err => console.log(err));
  }

  ReadAsBase64(file): Promise<any> {
    const reader = new FileReader();
    const fileValue = new Promise((resolve, reject) => {
      reader.addEventListener('load', () => {
        resolve(reader.result);
      });

      reader.addEventListener('error', (event) => {
        reject(event);
      });

      reader.readAsDataURL(file);
    })

    return fileValue;
  }

  openDialog(): void {
    const dialogRef = this.Dialog.open(ModalSolicitudCotizacionComponent, {
      width: '400px',
      data: this.tallas,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((curvaModel: CotizacionesCurvaModel) => {
      if (curvaModel !== undefined) {
        let findKey = false;
        for (let curva of this.curvasSeleccionadas) {
          if (curva.talla_id == curvaModel.talla_id) {
            curva.cantidad = curva.cantidad + curvaModel.cantidad;
            findKey = true;
          }
        }
        if (!findKey) { this.curvasSeleccionadas.push(curvaModel); }

        this.regcotizacionForm.controls.curva.setValue(this.curvasSeleccionadas);
      }
    });
  }

  mostrarTalla(talla_id) {
    let talla = this.tallas.filter((talla) => {
      return talla.id == talla_id;
    })[0];

    return talla.medida;
  }

  cancelarForm(type): void {
    this.formSaved = false;
    if (type == "success") {
      this.regcotizacionForm.reset();
      this.myForm.resetForm();
      this.curvasSeleccionadas = [];
      this.volumenSelected = null;
      this.selectedHMFile = '';
      this.selectedTPFile = '';
      this.hmFileName = 'No hay archivos seleccionados.';
      this.tpFileName = 'No hay archivos seleccionados.';
    }
  }

  setCotizacionRegistro(info): CotizacionesModel {
    let cotizacion = new CotizacionesModel();

    cotizacion.cliente_id = info.cliente;
    cotizacion.temporada_id = info.temporada;
    cotizacion.estilo = info.estilo;
    cotizacion.tipo_tela = info.tipoTela;
    cotizacion.composicion_tela = info.composicionTela;
    cotizacion.complemento1 = info.compleTela1;
    cotizacion.complemento2 = info.compleTela2;
    cotizacion.complemento3 = info.compleTela3;
    cotizacion.complemento4 = info.compleTela4;
    cotizacion.tp_archivo = this.selectedTPFile;
    cotizacion.hm_archivo = this.selectedHMFile;
    cotizacion.usuario_id = this.TokenService.GetPayload().id;

    return cotizacion;
  }

  registrarCotizacion(): void {
    if (!this.regcotizacionForm.valid || this.formSaved) { return; }

    this.formSaved = true;
    this.spinnerButton.active = true;

    this.cotizacion = this.setCotizacionRegistro(this.regcotizacionForm.value);

    let files = { tp: this.tpFileNameSelected, hm: this.hmFileNameSelected }

    this.ComercialService.RegistrarCotizacion(this.cotizacion, this.curvasSeleccionadas, files)
      .subscribe((response) => {
        this.swalAlert.showSwalMessage(response)
          .then(() => this.cancelarForm(response.type))
      }, err => {
        this._snackBar.open(err, 'cerrar', {
          duration: 5000,
          verticalPosition: "top",
        });
        this.spinnerButton.active = false;
        this.formSaved = false;
      });

  }

  removeCurva(item): void {
    Swal.fire({
      icon: 'question',
      title: '¿Seguro que desea eliminar la curva?',
      text: 'Si esta seguro de eliminar dar click en el boton aceptar.',
      confirmButtonText: 'Aceptar',
      showCancelButton: true,
      showCloseButton: true,
    }).then((rs) => {
      if (rs.value) {
        this.curvasSeleccionadas = this.curvasSeleccionadas.filter(val => {
          return JSON.stringify(item) != JSON.stringify(val);
        })
      }
    });
  }

}
