import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-modal-hoja-consumos-tallas',
  templateUrl: './modal-hoja-consumos-tallas.component.html',
  styleUrls: ['./modal-hoja-consumos-tallas.component.scss']
})
export class ModalHojaConsumosTallasComponent implements OnInit {
  total_curvas: any = 0;

  constructor(
    public dialogRef: MatDialogRef<ModalHojaConsumosTallasComponent>,
    @Inject(MAT_DIALOG_DATA) public tallas: any
  ) { }

  ngOnInit() {
    this.tallas.map( (talla) => {
      this.total_curvas += parseInt(talla.cantidad);
    })
  }

  onClose() {
    this.dialogRef.close();
  }

}
