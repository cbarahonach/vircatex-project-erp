import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import Swal from 'sweetalert2';
import { ExternoService } from 'src/app/services/externo.service';
import { ReporteTextilModel } from 'src/app/models/reportesTextil.model';

@Component({
  selector: 'app-modal-reporte-textil',
  templateUrl: './modal-reporte-textil.component.html',
  styleUrls: ['./modal-reporte-textil.component.scss']
})
export class ModalReporteTextilComponent implements OnInit {
  reporteTextil: ReporteTextilModel;
  arrayOfKeys;
  tmpID;

  constructor(
    public dialogRef: MatDialogRef<ModalReporteTextilComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ExternoService: ExternoService,
  ) {
    this.tmpID = this.data.id;
    delete this.data['id'];
    delete this.data['deleted_status'];
    delete this.data['created_at'];
    delete this.data['updated_at'];
    delete this.data['deleted_at'];
  }

  ngOnInit() {
    this.arrayOfKeys = Object.keys(this.data);
  }

  fixTitles(message) {
    return message.replace(/_/g, ' ').toUpperCase();
  }

  onClose(): void {
    this.dialogRef.close();
  }

  actualizarFichaTecnica(): void {
    this.data.id = this.tmpID;
    this.reporteTextil = this.data;

    Swal.fire({
      icon: 'question',
      title: '¿Desea guardar los cambios realizados?',
      confirmButtonColor: '#3f51b5',
      confirmButtonText: "Si, guardar cambios!",
      cancelButtonColor: '#f44336',
      showCancelButton: true,
      focusConfirm: false,
      showCloseButton: true,
    }).then((result) => {
      if (result.value) {
        this.ExternoService.ActualizarReporteTextil(this.reporteTextil).subscribe((response) => {
          if (response.type == 'success') {
            this.dialogRef.close();
          }
        }, err => console.log(err));
      }
    });
  }

}
