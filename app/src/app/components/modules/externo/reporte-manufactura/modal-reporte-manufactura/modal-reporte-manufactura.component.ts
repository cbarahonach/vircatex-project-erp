import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ReporteManufacturaModel } from 'src/app/models/reportesManufactura.model';

@Component({
  selector: 'app-modal-reporte-manufactura',
  templateUrl: './modal-reporte-manufactura.component.html',
  styleUrls: ['./modal-reporte-manufactura.component.scss']
})
export class ModalReporteManufacturaComponent implements OnInit {
  reporte: ReporteManufacturaModel;
  arrayOfKeys;

  constructor(
    public dialogRef: MatDialogRef<ModalReporteManufacturaComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any,
  ) {

  }

  ngOnInit() {
    this.initInputs(this.row.data);
    this.arrayOfKeys = Object.keys(this.reporte);
  }

  fixTitles(message) {
    return message.replace(/_/g, ' ').toUpperCase();
  }

  initInputs(data) {
    this.reporte = new ReporteManufacturaModel();
    this.reporte.programa = data.PROGRAMA;
    this.reporte.cliente = data.CLIENTE;
    this.reporte.po = data.PO;
    this.reporte.style = data.STYLE;
    this.reporte.tipo_prenda = data.TIPO_PRENDA;
    this.reporte.color = data.COLOR;
    this.reporte.op = data.OP;
    this.reporte.partida_vircatex = data.PARTIDA_VIRCATEX;
    this.reporte.partida_tintoreria_vircatex = data.PARTIDA_TINTORERIA_VIRCATEX;
    this.reporte.cantidad_pedido_unidad = data.CANTIDAD_PEDIDO_UNIDAD;
    this.reporte.fecha_de_po = data.FECHA_DE_PO;
    this.reporte.fecha_exportacion = data.FECHA_EXPORTACION;
    this.reporte.prov_textil = data.PROV_TEXTIL;
    this.reporte.tipo_tela = data.TIPO_TELA;
    this.reporte.q_req = data.TIPO_TELA;
    this.reporte.q_giro = data.Q_GIRO;
    this.reporte.porcentaje_giro = data.PORCENTAJE_GIRO;
    this.reporte.q_corte = data.Q_CORTE;
    this.reporte.porcentaje_corte_pedido = data.PORCENTAJE_CORTE_PEDIDO;
    this.reporte.stock_corte = data.STOCK_CORTE;
    this.reporte.porcentaje_cortar = data.PORCENTAJE_CORTAR;
    this.reporte.textil_hito_textil = data.TEXTIL_HITO_TEXTIL;
    this.reporte.textil_fecha_ini = data.TEXTIL_FECHA_INI;
    this.reporte.textil_segunda_fecha = data.TEXTIL_SEGUNDA_FECHA;
    this.reporte.textil_tercera_fecha = data.TEXTIL_TERCERA_FECHA;
    this.reporte.textil_tex_actual = data.TEXTIL_TEX_ACTUAL;
    this.reporte.textil_al_mes = data.TEXTIL_AL_MES;
    this.reporte.textil_kg_recidos = data.TEXTIL_KG_RECIDOS;
    this.reporte.abastecimiento_avios_prog = data.ABASTECIMIENTO_AVIOS_PROG;
    this.reporte.abastecimiento_avios_real = data.ABASTECIMIENTO_AVIOS_REAL;
    this.reporte.tendido_corte_de_panos_inicio = data.TENDIDO_CORTE_DE_PAÑOS_INICIO;
    this.reporte.tendido_corte_de_panos_fin = data.TENDIDO_CORTE_DE_PANHOS_FIN;
    this.reporte.lavado_panos_inicio = data.LAVADO_PANHOS_INICIO;
    this.reporte.lavado_panos_fin = data.LAVADO_PANHOS_FIN;
    this.reporte.corte_inicio = data.CORTE_INICIO;
    this.reporte.corte_fin = data.CORTE_FIN;
    this.reporte.bordado_piezas_inicio = data.BORDADO_PIEZAS_INICIO;
    this.reporte.bordado_piezas_fin = data.BORDADO_PIEZAS_FIN;
    this.reporte.estampados_pieza_inicio = data.ESTAMPADOS_PIEZA_INICIO;
    this.reporte.estampados_pieza_fin = data.ESTAMPADOS_PIEZA_FIN;
    this.reporte.costura_inicio = data.COSTURA_INICIO;
    this.reporte.costura_fin = data.COSTURA_FIN;
    this.reporte.lavado_inicio = data.LAVADO_INICIO;
    this.reporte.lavado_fin = data.LAVADO_FIN;
    this.reporte.estampado_transfer_inicio = data.ESTAMPADO_TRANSFER_INICIO;
    this.reporte.estampado_transfer_fin = data.ESTAMPADO_TRANSFER_FIN;
    this.reporte.bordado_prendas_inicio = data.BORDADO_PRENDAS_INICIO;
    this.reporte.bordado_prendas_fin = data.BORDADO_PRENDAS_INICIO;
    this.reporte.transfer_inicio = data.TRANSFER_INICIO;
    this.reporte.transfer_fin = data.TRANSFER_FIN;
    this.reporte.acabados_inicio = data.ACABADOS_INICIO;
    this.reporte.acabados_fin = data.ACABADOS_FIN;
    this.reporte.auditoria = data.AUDITORIA;
    this.reporte.exfty_original = data.EXFTY_ORIGINAL;
    this.reporte.exfty_anterior = data.EXFTY_ANTERIOR;
    this.reporte.exfty_actual = data.EXFTY_ACTUAL;
    this.reporte.rev_fecha = data.EXFTY_ACTUAL;
    this.reporte.modo_desp = data.EXFTY_ACTUAL;
    this.reporte.tops = data.TOPS;
    this.reporte.export = data.EXPORT;
    this.reporte.status = data.STATUS
    this.reporte.observacion = data.OBSERVACION
    this.reporte.estatus = data.ESTATUS;


    for (let key in this.reporte) {
      if (this.reporte[key] === undefined) { this.reporte[key] = ''; }
      if (
        key == 'fecha_de_po' || key == 'fecha_exportacion' || key == 'textil_hito_textil' ||
        key == 'textil_fecha_ini' || key == 'textil_tex_actual' || key == 'abastecimiento_avios_prog' ||
        key == 'corte_inicio' || key == 'corte_fin' || key == 'costura_inicio' || key == 'costura_fin' ||
        key == 'acabados_ini' || key == 'acabados_fin' || key == 'auditoria' || key == 'exfty_original' ||
        key == 'exfty_actual'
      ) {
        this.reporte[key] = this.xlSerialToJsDate(this.reporte[key]);
      }

    }

  }

  xlSerialToJsDate(xlSerial) {
    if (xlSerial == null || xlSerial == '' || xlSerial == undefined) { return; }
    if(xlSerial.toString().indexOf('-') > 0) { return xlSerial; }

    let date = new Date(-2209075200000 + (xlSerial - (xlSerial < 61 ? 0 : 1)) * 86400000);

    return (parseInt(date.getDate().toString()) + 1) + '-' + date.getMonth() + '-' + date.getFullYear();
  }

  onClose(): void {
    this.dialogRef.close();
  }

  guardarReporte() {
    this.dialogRef.close({ data: this.reporte, position: this.row.position });
  }

}
