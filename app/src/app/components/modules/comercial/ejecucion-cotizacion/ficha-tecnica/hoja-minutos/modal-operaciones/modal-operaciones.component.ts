import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatSelect } from '@angular/material';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { HojaMinutosOperacionesModel } from 'src/app/models/hojaMinutosOperaciones.model';
import { ComercialService } from 'src/app/services/comercial.service';
import { MaquinasModel } from 'src/app/models/maquinas.model';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ButtonHelper } from 'src/app/_helpers/button.helper';

@Component({
  selector: 'app-modal-operaciones',
  templateUrl: './modal-operaciones.component.html',
  styleUrls: ['./modal-operaciones.component.scss']
})
export class ModalOperacionesComponent implements OnInit {
  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;
  maquinaFiltrado: ReplaySubject<any> = new ReplaySubject<any>(1);
  displayedColumns: string[] = [
    'item', 'bloque', 'operacion', 'maquina',
    'ts', 'efic_esp', 'ts_valor', 'puestos_teoricos',
    'prod_hora', 'horas_req', 'cat', 'delete'
  ];
  modalOperacionesForm: FormGroup;
  dataSource: MatTableDataSource<any>;
  maquinas: MaquinasModel[];
  protected _onDestroy = new Subject<void>();
  metaTmp: number = 0;
  totalTSMaq: number = 0;
  totalTSTmp: number = 0;
  eficiencia: number = 0;
  firstOperation: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ModalOperacionesComponent>,
    public ComercialService: ComercialService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.eficiencia = this.data.puestoTeorico.eficiencia;
    this.maquinas = this.data.maquinas;
    this.maquinaFiltrado.next(this.maquinas.slice());
    this.configForm();
    this.observableForm();
    this.generateTotalTsMaq();
    this.loadOperaciones();
  }

  loadOperaciones() {
    if (this.data.operaciones.length <= 0) { this.firstOperation = true; }
    this.dataSource = new MatTableDataSource(this.data.operaciones);
  }

  private filtrarMaquinas(): void {
    if (!this.maquinas) {
      return;
    }
    let buscar = this.modalOperacionesForm.controls.maquinaBuscador.value;
    if (!buscar) {
      this.maquinaFiltrado.next(this.maquinas.slice());
      return;
    } else {
      buscar = buscar.toLowerCase();
    }
    this.maquinaFiltrado.next(
      this.maquinas.filter(maquina => maquina.tipo.toLowerCase().indexOf(buscar) > -1)
    );
  }



  configForm(): void {
    this.modalOperacionesForm = this.formBuilder.group({
      'bloque': ['', [Validators.required]],
      'operacion': ['', [Validators.required]],
      'maquina': ['', [Validators.required]],
      'maquinaBuscador': ['', []],
      'ts': ['', [Validators.required]],
      'cat': ['', [Validators.required]]

    })
  }

  guardarOperaciones(): void {
    this.dialogRef.close(this.data.operaciones);
  }

  observableForm(): void {
    this.modalOperacionesForm.controls.maquinaBuscador.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filtrarMaquinas();
      });
  }

  onClose(): void {
    this.dialogRef.close();
  }

  generateTotalTsMaq() {
    this.totalTSTmp = 0;
    if (this.data.operaciones.length > 0) {
      this.data.operaciones.map((operacion) => {
        this.totalTSTmp += parseFloat(operacion.ts);

      })
    }
  }

  processPuestoTeorico(ts, status) {
    let pt = this.data.puestoTeorico;
    this.metaTmp = (((pt.operarios * pt.minutoTurno) / this.totalTSTmp) * pt.eficiencia) / 100;
    let ptrs = (parseFloat(ts) * this.metaTmp) / pt.minutoTurno;
    return (status) ? ptrs.toFixed(3) : (!!ts) ? Math.round(ptrs) : 0;
  }

  processTsValor(ts) {
    return ((ts * this.eficiencia) / 100).toFixed(2).toString();
  }

  processProdHora(ts, status) {
    return (status) ? Math.round(60 / ts) : (!!ts) ? (60 / ts).toFixed(5) : 0;
  }

  processHoraReq(ts, status) {
    return (status) ? ((this.metaTmp * ts) / 60).toFixed(3) : (!!ts) ? Math.round((this.metaTmp * ts) / 60) : 0;
  }

  onSubmit(data): void {
    let op = new HojaMinutosOperacionesModel();
    op.bloque = data.bloque;
    op.operacion = data.operacion;
    op.id_maquina = data.maquina;
    op.ts = data.ts;
    op.cat = data.cat;

    if (this.firstOperation) {
      this.totalTSTmp = data.ts;
      this.firstOperation = false;
    }

    this.data.operaciones.push(op);
    this.dataSource = new MatTableDataSource(this.data.operaciones);
    this.generateTotalTsMaq();
    this.modalOperacionesForm.reset();
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

  removeRow(element) {
    this.data.operaciones = this.data.operaciones.filter(e => {
      return e != element;
    });

    this.dataSource = new MatTableDataSource(this.data.operaciones);
    this.generateTotalTsMaq();
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
