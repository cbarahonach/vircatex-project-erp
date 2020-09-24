import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-resumen',
  templateUrl: './modal-resumen.component.html',
  styleUrls: ['./modal-resumen.component.scss']
})
export class ModalResumenComponent implements OnInit {

  modalResumenForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ModalResumenComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.configForm();
    this.init();
    this.listenFrm();
  }

  onClose() {
    this.dialogRef.close();
  }

  configForm() {
    this.modalResumenForm = this.formBuilder.group({
      'tiempo_costura': { value: '', disabled: true },
      'tpo_corte': [''],
      'tpo_acabados': ['',],
      'total': { value: '', disabled: true }
    });
  }

  init() {
    this.modalResumenForm.controls.tiempo_costura.setValue(!!this.data.tiempo_costura ? this.data.tiempo_costura : '');
    this.modalResumenForm.controls.tpo_corte.setValue(!!this.data.tpo_corte ? this.data.tpo_corte : '');
    this.modalResumenForm.controls.tpo_acabados.setValue(!!this.data.tpo_acabados ? this.data.tpo_acabados : '');

    if (this.modalResumenForm.controls.tpo_corte.value.trim().length > 0 &&
      this.modalResumenForm.controls.tpo_acabados.value.trim().length > 0) {
      let rs = Number(this.modalResumenForm.controls.tpo_acabados.value) +
        Number(this.modalResumenForm.controls.tiempo_costura.value) +
        Number(this.modalResumenForm.controls.tpo_corte.value);
      this.modalResumenForm.controls.total.setValue(((rs).toFixed(4)));
    }
  }

  listenFrm() {
    this.modalResumenForm.controls.tpo_corte.valueChanges
      .subscribe((text) => {
        if (this.modalResumenForm.controls.tpo_acabados.value.trim().length > 0) {
          let rs = Number(text) +
            Number(this.modalResumenForm.controls.tiempo_costura.value) +
            Number(this.modalResumenForm.controls.tpo_acabados.value);
          this.modalResumenForm.controls.total.setValue(((rs).toFixed(4)));
        }
      });

    this.modalResumenForm.controls.tpo_acabados.valueChanges
      .subscribe((text) => {
        if (this.modalResumenForm.controls.tpo_corte.value.trim().length > 0) {
          let rs = Number(text) +
            Number(this.modalResumenForm.controls.tiempo_costura.value) +
            Number(this.modalResumenForm.controls.tpo_corte.value);
          this.modalResumenForm.controls.total.setValue(((rs).toFixed(4)));
        }
      });
  }

  guardarResumen() {
    this.dialogRef.close(this.modalResumenForm.value);
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
