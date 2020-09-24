import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { CotizacionesFTHojaCotizacionAviosModel } from 'src/app/models/cotizacionesFTHojaCotizacionAvios.model';

@Component({
  selector: 'app-modal-hoja-cotizacion-avios',
  templateUrl: './modal-hoja-cotizacion-avios.component.html',
  styleUrls: ['./modal-hoja-cotizacion-avios.component.scss']
})
export class ModalHojaCotizacionAviosComponent implements OnInit {
  @ViewChild('myForm', { static: false }) myForm: NgForm;
  modalAviosForm: FormGroup;
  medidas = [
    { name: "Metros", status: true },
    { name: "Unidades", status: true },
  ]
  displayedColumns = ['item', 'descripcion', 'consumo', 'medida', 'remove'];
  dataSource: MatTableDataSource<any>;
  avios_tmp: Array<CotizacionesFTHojaCotizacionAviosModel> = [];

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ModalHojaCotizacionAviosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    if (this.data.avios.length > 0) { this.avios_tmp = this.data.avios; }

    this.configForm();
    this.dataSource = new MatTableDataSource(this.avios_tmp);
  }

  configForm(): void {
    this.modalAviosForm = this.formBuilder.group({
      'descripcion': ['', [Validators.required]],
      'consumo': ['', [Validators.required]],
      'medida': ['', [Validators.required]],
    })
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    let frmavios = new CotizacionesFTHojaCotizacionAviosModel();
    frmavios.descripcion = this.modalAviosForm.controls.descripcion.value;
    frmavios.consumo = this.modalAviosForm.controls.consumo.value;
    frmavios.unidad_medida = this.modalAviosForm.controls.medida.value;
    this.avios_tmp.push(frmavios);

    this.dataSource = new MatTableDataSource(this.avios_tmp);
    this.modalAviosForm.reset();
    this.myForm.resetForm();
  }

  removeRow(avios): void {
    this.avios_tmp = this.avios_tmp.filter(e => {
      return e !== avios;
    });
    this.dataSource = new MatTableDataSource(this.avios_tmp);
    this.modalAviosForm.reset();
    this.myForm.resetForm();
  }

  guardarRutas(): void {
    this.dialogRef.close(this.avios_tmp);
  }

}
