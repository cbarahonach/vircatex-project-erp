import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { CotizacionesFTHojaCotizacionRutasModel } from 'src/app/models/cotizacionesFTHojaCotizacionRutas.model';

@Component({
  selector: 'app-modal-hoja-cotizacion-rutas',
  templateUrl: './modal-hoja-cotizacion-rutas.component.html',
  styleUrls: ['./modal-hoja-cotizacion-rutas.component.scss']
})
export class ModalHojaCotizacionRutasComponent implements OnInit {
  @ViewChild('myForm', { static: false }) myForm: NgForm;
  modalRutasForm: FormGroup;
  rutas = [
    { name: "Cortar paño", status: true },
    { name: "Lavar paños", status: true },
    { name: "Estampado", status: true },
    { name: "Bordado", status: true },
    { name: "Reposo de tela (max 12HS)", status: true },
    { name: "Reposo de bloques", status: true },
    { name: "Corte", status: true },
    { name: "Costura", status: true },
    { name: "Lavanderia pigmento", status: true },
    { name: "Lavado prenda", status: true },
    { name: "Transfer", status: true },
    { name: "Inspeccion", status: true },
    { name: "Acabado", status: true }
  ]
  rutas_tmp: Array<CotizacionesFTHojaCotizacionRutasModel> = [];
  displayedColumns = ['paso', 'ruta', 'observacion', 'remove'];
  dataSource: MatTableDataSource<any>;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ModalHojaCotizacionRutasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    if(this.data.rutas.length > 0) {
      this.disableSelectRuta();
      this.rutas_tmp = this.data.rutas;
    }

    this.configForm();
    this.dataSource = new MatTableDataSource(this.rutas_tmp);
  }

  disableSelectRuta(): void {
    this.data.rutas.map(item => {
      this.rutas.map(ruta => {
        if (ruta.name == item.rutas) {
          ruta.status = false;
        }
      })
    })
  }

  configForm(): void {
    this.modalRutasForm = this.formBuilder.group({
      'ruta': ['', [Validators.required]],
      'observacion': ['', [Validators.required]],
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {

    let ftruta = new CotizacionesFTHojaCotizacionRutasModel();
    ftruta.rutas = this.modalRutasForm.controls.ruta.value;
    ftruta.observacion = this.modalRutasForm.controls.observacion.value;

    this.rutas_tmp.push(ftruta);

    this.rutas.map(e => {
      if (e.name == this.modalRutasForm.controls.ruta.value) {
        e.status = false;
      }
    })

    this.dataSource = new MatTableDataSource(this.rutas_tmp);
    this.modalRutasForm.reset();
    this.myForm.resetForm();
  }

  removeRow(ruta): void {
    this.rutas_tmp = this.rutas_tmp.filter(e => {
      return e.rutas != ruta.rutas;
    });

    this.rutas.map(e => {
      if (e.name == ruta.ruta) {
        e.status = true;
      }
    })

    this.dataSource = new MatTableDataSource(this.rutas_tmp);
    this.modalRutasForm.reset();
    this.myForm.resetForm();
  }

  guardarRutas(): void {
    this.dialogRef.close(this.rutas_tmp);
  }

}
