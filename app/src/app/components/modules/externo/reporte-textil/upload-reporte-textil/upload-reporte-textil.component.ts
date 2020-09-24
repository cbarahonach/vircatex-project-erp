import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import * as XLSX from 'xlsx';
import { appURL } from 'src/app/app.uri.js';
import { ReporteTextilModel } from 'src/app/models/reportesTextil.model';
import { ExternoService } from 'src/app/services/externo.service';
import * as Joi from '@hapi/joi';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upload-reporte-textil',
  templateUrl: './upload-reporte-textil.component.html',
  styleUrls: ['./upload-reporte-textil.component.scss']
})
export class UploadReporteTextilComponent implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput: any;
  @Output() updateTable = new EventEmitter();
  uploader: FileUploader = new FileUploader({ url: appURL, disableMultipart: true });
  inputFileMessage: String = 'No hay archivos seleccionados.';
  noenviar: boolean = true;
  reporteTextil: ReporteTextilModel[] = [];

  constructor(private ExternoService: ExternoService) { }

  ngOnInit() { }

  OnFileSelected(ev): void {
    let workBook = null;
    let jsonData = null;
    let keySheet = null;
    let new_keySheet = null;
    const reader = new FileReader();
    const file = ev[0];
    this.inputFileMessage = file.name;

    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});

      keySheet = Object.keys(jsonData)[0];
      new_keySheet = 'sheet';

      if (keySheet !== new_keySheet) {
        Object.defineProperty(jsonData, new_keySheet,
          Object.getOwnPropertyDescriptor(jsonData, keySheet));
        delete jsonData[keySheet];
      }

      let jsonObject = [];
      let jsonDataClean = {};
      for (const e of jsonData.sheet) {
        for (var key in e) {
          if (e[key] == 'xx NO xx') {
            delete e[key];
          } else {
            let newKey = key.replace(/\s+/g, '').normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
            jsonDataClean[newKey.replace('_1', '')] = e[key];
          }
        }
        jsonObject.push(jsonDataClean);
        jsonDataClean = {};
      }

      this.poblarReportes(jsonObject);
    }
    reader.readAsBinaryString(file);
  }

  poblarReportes(data): void {
    if (this.validarExcel(data[0])) { return; }

    data.forEach(row => {
      let reporte = new ReporteTextilModel();
      reporte.articulo = row["ARTICULO"];
      reporte.cliente = row["CLIENTE"];
      reporte.color = row["COLOR"];
      reporte.comentarios = row["COMENTARIOS"];
      reporte.dias_atraso = row["DIASDEATRASO"];
      reporte.estilo = row["ESTILO"];
      reporte.fabrica = row["FABRICA"];
      reporte.fecha_creacion_po = row["FECHACREACIONPO"];
      reporte.fecha_hilado = row["FECHADEHILADO"];
      reporte.fecha_despacho_real = row["FECHADESPACHOREAL"];
      reporte.fecha_tejido = row["FECHADETEJIDO"];
      reporte.fecha_oc_tela = row["FECHAOCTELA"];
      reporte.fecha_programada_auditoria = row["FECHAPROGRAMADAAUDITORIA"];
      reporte.fecha_reprogramada_auditoria = row["FECHAREPROGRAMADADEAUDITORIA"];
      reporte.fecha_ta_planta = row["FECHATAENPLANTA"];
      reporte.fecha_tenhido = row["FECHATENIDO"];
      reporte.kg_prog = row["KGPROG"];
      reporte.kilos_despacho = row["KILOSDESPACHADOS"];
      reporte.oc_tela = row["OCTELA"];
      reporte.op = row["OP"];
      reporte.partida = row["PARTIDA"];
      reporte.po_buy = row["POBUY"];
      reporte.situacion_actual = row["SITUACIONACTUAL"];
      reporte.tela_principal_complemento = row["TELAPRINCIPALCOMPLEMENTO"];
      reporte.tintoreria = row["TINTORERIA"];
      reporte.tipo_req = row["TIPOREQ"];

      this.reporteTextil.push(reporte);
    });

    if (this.reporteTextil.length > 0) { this.noenviar = false; }
  }

  registrarReportes(): void {
    this.ExternoService.RegistrarReporteTextil(this.reporteTextil).subscribe((response) => {
      if (response.type = 'success') {
        Swal.fire({
          icon: 'success',
          title: response.message,
          confirmButtonColor: '#3f51b5',
          focusConfirm: false,
        }).then(() => {
          this.reporteTextil = [];
          this.noenviar = true;
          this.inputFileMessage = 'No hay archivos seleccionados.';
          this.fileInput.nativeElement.value = '';
          this.updateTable.emit(true);
        })

      }
    }, err => console.log(err));
  }

  validarExcel(row): boolean {
    let invalido = false;

    const schema = Joi.object().keys({
      ARTICULO: Joi.any().allow('').optional(),
      CLIENTE: Joi.any().allow('').optional(),
      COLOR: Joi.any().allow('').optional(),
      COMENTARIOS: Joi.any().allow('').optional(),
      DIASDEATRASO: Joi.any().allow('').optional(),
      ESTILO: Joi.any().allow('').optional(),
      FABRICA: Joi.any().allow('').optional(),
      FECHACREACIONPO: Joi.any().allow('').optional(),
      FECHADEHILADO: Joi.any().allow('').optional(),
      FECHADESPACHOREAL: Joi.any().allow('').optional(),
      FECHADETEJIDO: Joi.any().allow('').optional(),
      FECHAOCTELA: Joi.any().allow('').optional(),
      FECHAPROGRAMADAAUDITORIA: Joi.any().allow('').optional(),
      FECHAREPROGRAMADADEAUDITORIA: Joi.any().allow('').optional(),
      FECHATAENPLANTA: Joi.any().allow('').optional(),
      FECHATENIDO: Joi.any().allow('').optional(),
      KGPROG: Joi.any().allow('').optional(),
      KILOSDESPACHADOS: Joi.any().allow('').optional(),
      OCTELA: Joi.any().allow('').optional(),
      OP: Joi.any().allow('').optional(),
      PARTIDA: Joi.any().allow('').optional(),
      POBUY: Joi.any().allow('').optional(),
      SITUACIONACTUAL: Joi.any().allow('').optional(),
      TELAPRINCIPALCOMPLEMENTO: Joi.any().allow('').optional(),
      TINTORERIA: Joi.any().allow('').optional(),
      TIPOREQ: Joi.any().allow('').optional(),
    })

    const { error, value } = schema.validate(row);

    if (error && error.details) {
      invalido = true;
      this.noenviar = true
      this.reporteTextil = [];
      this.fileInput.nativeElement.value = '';
      Swal.fire({
        icon: 'error',
        text: 'Formato de excel invalido.'
      });
    }

    return invalido;
  }

}
