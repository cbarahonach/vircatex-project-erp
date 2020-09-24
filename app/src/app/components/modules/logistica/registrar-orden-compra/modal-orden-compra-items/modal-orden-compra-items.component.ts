import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-orden-compra-items',
  templateUrl: './modal-orden-compra-items.component.html',
  styleUrls: ['./modal-orden-compra-items.component.scss']
})
export class ModalOrdenCompraItemsComponent implements OnInit {
  modalItemOrdenCompras: FormGroup;
  unidad_medida_selector: Array<String> = ["Millar", "Unidad", "Metro", "Conos", "Kilogramos"];
  desc_title: string = 'Descripción';

  constructor(
    public dialogRef: MatDialogRef<ModalOrdenCompraItemsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit() {
  this.processDesc(this.data.title);    
    this.configurarFormulario();
  }

  processDesc(text) {
    this.desc_title = text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();    
  }

  configurarFormulario() {
    this.modalItemOrdenCompras = this.formBuilder.group({
      "item": ["", [Validators.required]],
      "concepto": ["", [Validators.required]],
      "cantidad": ["", [Validators.required]],
      "unidad_medida": ["", [Validators.required]],
      "precio_unitario": ["", [Validators.required]]
    });
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      if (charCode == 46) { return true; }
      return false;
    }
    return true;

  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit(data) {
    this.dialogRef.close(data);
  }

}
