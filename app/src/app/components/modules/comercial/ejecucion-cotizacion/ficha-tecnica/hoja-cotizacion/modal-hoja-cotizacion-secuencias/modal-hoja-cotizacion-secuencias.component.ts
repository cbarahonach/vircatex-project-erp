import { Component, OnInit, Inject, ViewChild } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatTableDataSource
} from "@angular/material";
import { FormBuilder, FormGroup, Validators, NgForm } from "@angular/forms";
import { MaquinasModel } from "src/app/models/maquinas.model";
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CotizacionesFTHojaCotizacionSecuenciasModel } from 'src/app/models/cotizacionesFTHojaCotizacionSecuencias.model';

@Component({
  selector: "app-modal-hoja-cotizacion-secuencias",
  templateUrl: "./modal-hoja-cotizacion-secuencias.component.html",
  styleUrls: ["./modal-hoja-cotizacion-secuencias.component.scss"]
})
export class ModalHojaCotizacionSecuenciasComponent implements OnInit {
  @ViewChild("myForm", { static: false }) myForm: NgForm;
  modalSecuenciasForm: FormGroup;
  maquinaFiltrado: ReplaySubject<any> = new ReplaySubject<any>(1);
  displayedColumns = [
    "secuencia",
    "descripcion",
    "merma",
    "maquina",
    "puntadas",
    "remove"
  ];
  dataSource: MatTableDataSource<any>;
  secuencias_tmp: Array<CotizacionesFTHojaCotizacionSecuenciasModel> = [];
  maquinas: MaquinasModel[];
  protected _onDestroy = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ModalHojaCotizacionSecuenciasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {    
    if (this.data.secuencias.length > 0) {
      this.secuencias_tmp = this.data.secuencias;
    }

    this.maquinas = this.data.maquinas;
    this.maquinaFiltrado.next(this.maquinas.slice());
    this.configForm();
    this.observableForm();
    this.dataSource = new MatTableDataSource(this.secuencias_tmp);
  }

  onClose(): void {
    this.dialogRef.close();
  }

  private filtrarMaquinas(): void {
    if (!this.maquinas) {
      return;
    }
    let buscar = this.modalSecuenciasForm.controls.maquinaBuscador.value;
    if (!buscar) {
      this.maquinaFiltrado.next(this.maquinas.slice());
      return;
    } else {
      buscar = buscar.toLowerCase();
    }
    this.maquinaFiltrado.next(
      this.maquinas.filter(
        maquina => maquina.tipo.toLowerCase().indexOf(buscar) > -1
      )
    );
  }

  observableForm(): void {
    this.modalSecuenciasForm.controls.maquinaBuscador.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filtrarMaquinas();
      });
  }

  configForm(): void {    
    this.modalSecuenciasForm = this.formBuilder.group({
      secuencia: ["", [Validators.required]],
      descripcion: ["", [Validators.required]],
      merma: ["", [Validators.required]],
      maquina: ["", [Validators.required]],
      maquinaBuscador: ["", []],
      puntadas: ["", [Validators.required]]
    });
  }

  tipoMaquina(id_maquina) {
    let rs = '';
    for (let item of this.maquinas) {
      if (id_maquina == item.id) {
        rs = item.tipo;
      }
    }
    return rs;
  }

  onSubmit(): void {
    let secuencia = new CotizacionesFTHojaCotizacionSecuenciasModel();
    secuencia.secuencia = this.modalSecuenciasForm.controls.secuencia.value;
    secuencia.descripcion = this.modalSecuenciasForm.controls.descripcion.value;
    secuencia.merma = this.modalSecuenciasForm.controls.merma.value;
    secuencia.maquina_id = this.modalSecuenciasForm.controls.maquina.value;
    secuencia.puntadas = this.modalSecuenciasForm.controls.puntadas.value;

    this.secuencias_tmp.push(secuencia);

    this.dataSource = new MatTableDataSource(this.secuencias_tmp);
    this.modalSecuenciasForm.reset();
    this.myForm.resetForm();
  }

  removeRow(secuencia): void {
    this.secuencias_tmp = this.secuencias_tmp.filter(e => {
      return e !== secuencia;
    });
    this.dataSource = new MatTableDataSource(this.secuencias_tmp);
    this.modalSecuenciasForm.reset();
    this.myForm.resetForm();
  }

  guardarSecuencias(): void {
    this.dialogRef.close(this.secuencias_tmp);       
  }
}
