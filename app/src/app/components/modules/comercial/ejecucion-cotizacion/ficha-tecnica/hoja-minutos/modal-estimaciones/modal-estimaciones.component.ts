import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-estimaciones',
  templateUrl: './modal-estimaciones.component.html',
  styleUrls: ['./modal-estimaciones.component.scss']
})
export class ModalEstimacionesComponent implements OnInit {
  modalEstimacionesForm: FormGroup;
  totalTSMaq: number = 0;
  minutoTurno: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ModalEstimacionesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.totalTSMaq = this.data.totalTsMaq;
    this.minutoTurno = this.data.minutoTurno;
    this.configFormulario();
    this.listenInputs();
    
    if (typeof this.data.frm === 'object' && Object.keys(this.data.frm).length > 0) {
      this.loadFrm(this.data.frm);
    } else if (typeof this.data.frm === 'string' && this.data.frm.trim().length > 0) {
      this.loadFrm(JSON.parse(this.data.frm));
    }
  }

  loadFrm(data) {
    if(!!data.quiero_sacar) {  this.modalEstimacionesForm.controls.quiero_sacar.setValue(data.quiero_sacar); }
    if(!!data.si_tengo) { this.modalEstimacionesForm.controls.si_tengo.setValue(data.si_tengo); }
  }

  listenInputs() {
    this.modalEstimacionesForm.controls.quiero_sacar.valueChanges
      .subscribe((text) => {
        this.modalEstimacionesForm.controls.necesito.setValue(((Number(text) * this.totalTSMaq) / this.minutoTurno).toFixed(2));
      });
    this.modalEstimacionesForm.controls.si_tengo.valueChanges
      .subscribe((text) => {
        this.modalEstimacionesForm.controls.puedo_sacar.setValue((this.totalTSMaq > 0) ? Math.round((this.minutoTurno * Number(text)) / this.totalTSMaq) : 'ERROR');
      });
  }

  configFormulario(): void {
    this.modalEstimacionesForm = this.formBuilder.group({
      'quiero_sacar': ['', [Validators.required]],
      'necesito': { value: '', disabled: true },
      'si_tengo': ['', [Validators.required]],
      'puedo_sacar': { value: '', disabled: true }
    })
  }

  onClose(): void {
    this.dialogRef.close();
  }

  guardarEstimaciones(): void {
    if (this.modalEstimacionesForm.status == 'VALID') {
      this.dialogRef.close(this.modalEstimacionesForm.value);
    }
    else {
      Swal.fire({
        icon: 'warning',
        text: 'Complete todo los campos.'
      });
    }
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
