import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-modal-maquinas',
  templateUrl: './modal-maquinas.component.html',
  styleUrls: ['./modal-maquinas.component.scss']
})
export class ModalMaquinasComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'tipo', 'maquina', 'tstd', 'req', 'a_solicitar'
  ];
  maquinas: any[] = [];
  operaciones: any[];
  eficiencia: any;
  total_ts_maq: any;
  metaTmp: any;
  minutoTurnos: any;
  operarios: any;
  a_solicitar_total: number = 0;

  constructor(
    public dialogRef: MatDialogRef<ModalMaquinasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.init();
    this.processOperaciones();
  }

  init() {
    this.eficiencia = this.data.eficiencia;
    this.total_ts_maq = parseFloat(this.data.totalTsMaq).toFixed(3);
    this.minutoTurnos = this.data.minutoTurnos;
    this.operarios = this.data.operarios;
  }

  onClose(): void {
    this.dialogRef.close();
  }

  processOperaciones() {
    this.operaciones = this.data.operaciones;
    let rs = [];
    let status = false;

    for (let op of this.operaciones) {
      let opTmp = { id_maquina: op.id_maquina, ts: op.ts }
      for (let item of rs) {
        if (item.id_maquina == opTmp.id_maquina) {
          item.ts = parseFloat(item.ts) + parseFloat(opTmp.ts);
          status = true;
        }
      }
      opTmp.ts = parseFloat(opTmp.ts).toFixed(3);
      if (!status) { rs.push(opTmp); }
      status = false;
    }

    this.loadMaquinas(rs);
  }

  loadMaquinas(total_op) {
    this.data.maquinas.map((maquina) => {
      for (let item of total_op) {
        if (item.id_maquina == maquina.id) {
          let obj = item;
          obj.nombre_maquina = maquina.nombre;
          obj.tipo_maquina = maquina.tipo;
          obj.req = this.processPuestoTeorico(obj.ts, true);
          obj.a_solicitar = this.processPuestoTeorico(obj.ts, false);

          this.a_solicitar_total += Number(this.processPuestoTeorico(obj.ts, false));
          this.maquinas.push(obj);
        }
      }
    });

    this.dataSource = new MatTableDataSource(this.maquinas);
  }

  processPuestoTeorico(ts, status) {
    this.metaTmp = (((this.operarios * this.minutoTurnos) / this.total_ts_maq) * this.eficiencia) / 100;
    let ptrs = (parseFloat(ts) * this.metaTmp) / this.minutoTurnos;
    return status ? ptrs.toFixed(2) : Math.ceil(ptrs);
  }

}
