import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ExternoService } from 'src/app/services/externo.service';
import { FileUploader } from 'ng2-file-upload';
import * as XLSX from 'xlsx';
import { appURL } from 'src/app/app.uri.js';
import _ from 'lodash';
import { TokenService } from 'src/app/services/token.service';
import Swal from 'sweetalert2';
import { DownloadFileURL } from 'src/app/app.uri.js';

@Component({
  selector: 'app-frm-reporte-manufactura',
  templateUrl: './frm-reporte-manufactura.component.html',
  styleUrls: ['./frm-reporte-manufactura.component.scss']
})
export class FrmReporteManufacturaComponent implements OnInit {
  @Output() reloadTable = new EventEmitter();
  @ViewChild('myForm', { static: true }) myForm: NgForm;
  regReporteManufactura: FormGroup
  uploader: FileUploader = new FileUploader({ url: appURL, disableMultipart: true });
  inputFileMessage: string = 'No hay archivos seleccionados.';
  noenviar: boolean = true;
  FileFormatURL = DownloadFileURL + 'excel/FormatoExcelReporteManufactura';

  constructor(
    private formBuilder: FormBuilder,
    private ExternoService: ExternoService,
    private TokenService: TokenService,
  ) { }

  ngOnInit() {
    this.configForm();

    this.regReporteManufactura.statusChanges.subscribe(
      result => (result == 'VALID') ?
        this.noenviar = false : this.noenviar = true
    );
  }

  configForm(): void {
    this.regReporteManufactura = this.formBuilder.group({
      'cliente': ['', [Validators.required]],
      'data': ['', Validators.required]
    });
  }

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
      let i = 0;
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
        i++; //--
      }
      jsonObject = jsonObject.filter( row => row.hasOwnProperty('PROGRAMA'));
      
      this.regReporteManufactura.controls.data.setValue(jsonObject);

    }
    reader.readAsBinaryString(file);
  }

  registrarManufactura(): void {

    let reporte = {
      cliente: this.regReporteManufactura.controls.cliente.value,
      usuario_id: this.TokenService.GetPayload().id,
      data: this.regReporteManufactura.controls.data.value
    };

    this.ExternoService.RegistrarReporteManufactura(reporte).subscribe((response) => {
      if(response.type == 'success') {
        Swal.fire({
          icon: 'success',
          text: response.message,
          confirmButtonColor: "#0069d9",
          confirmButtonText: "Aceptar"
        }).then(() => {
          this.reloadTable.emit(true);
          this.regReporteManufactura.reset();
          this.myForm.resetForm();
          this.inputFileMessage = 'No hay archivos seleccionados.';
        });
      } 
    }, err => console.log(err));
  }

}
