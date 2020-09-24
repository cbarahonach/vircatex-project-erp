import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSelect } from '@angular/material';
import { ReplaySubject, Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { CotizacionesCurvaModel } from 'src/app/models/cotizacionesCurva.model';
import { TallasModel } from 'src/app/models/tallas.model';

@Component({
  selector: 'app-modal-solicitud-cotizacion',
  templateUrl: './modal-solicitud-cotizacion.component.html',
  styleUrls: ['./modal-solicitud-cotizacion.component.scss']
})
export class ModalSolicitudCotizacionComponent implements OnInit {
  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;
  curvaFiltrado: ReplaySubject<any> = new ReplaySubject<any>(1);
  protected _onDestroy = new Subject<void>();
  modalFormCurva: FormGroup;
  disabled: boolean = true;
  curvas: CotizacionesCurvaModel;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ModalSolicitudCotizacionComponent>,
    @Inject(MAT_DIALOG_DATA) public tallas: Array<TallasModel>) { }

  ngOnInit(): void {
    this.curvaFiltrado.next(this.tallas.slice());
    this.configurarFormulario();

    this.modalFormCurva.controls.curvaBuscador.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filtrarCurva();
      });

    this.modalFormCurva.statusChanges.subscribe(
      result => (result == 'VALID') ?
        this.disabled = false : this.disabled = true
    );
  }

  configurarFormulario(): void {
    this.modalFormCurva = this.formBuilder.group({
      'curva': [
        '',
        [
          Validators.required,
        ]
      ],
      'curvaBuscador': [
        ''
      ],
      'cantidad': [
        '',
        [
          Validators.required,
        ]
      ],
    });
  }

  private filtrarCurva(): void {
    if (!this.tallas) {
      return;
    }
    let buscar = this.modalFormCurva.controls.curvaBuscador.value;
    if (!buscar) {
      this.curvaFiltrado.next(this.tallas.slice());
      return;
    } else {
      buscar = buscar.toLowerCase();
    }
    this.curvaFiltrado.next(
      this.tallas.filter(talla => talla.medida.toLowerCase().indexOf(buscar) > -1)
    );
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.curvas = new CotizacionesCurvaModel();
    this.curvas.talla_id = this.modalFormCurva.controls.curva.value;
    this.curvas.cantidad = this.modalFormCurva.controls.cantidad.value;
    
    this.dialogRef.close(this.curvas);
  }

}
