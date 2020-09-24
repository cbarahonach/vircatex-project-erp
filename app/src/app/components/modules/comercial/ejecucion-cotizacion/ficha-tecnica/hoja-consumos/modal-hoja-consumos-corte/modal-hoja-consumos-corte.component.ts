import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FileUploader } from 'ng2-file-upload';
import { appURL, publicImageURL } from 'src/app/app.uri.js';
import Swal from 'sweetalert2';

const EMPTYFILE = 'No hay archivos seleccionados.';

@Component({
  selector: 'app-modal-hoja-consumos-corte',
  templateUrl: './modal-hoja-consumos-corte.component.html',
  styleUrls: ['./modal-hoja-consumos-corte.component.scss']
})
export class ModalHojaConsumosCorteComponent implements OnInit {
  uploader: FileUploader = new FileUploader({ url: appURL, disableMultipart: true });
  imageName: string = EMPTYFILE;
  imageSelected: any = '';
  imageExtension: any = '';
  image: any = '';

  constructor(
    public dialogRef: MatDialogRef<ModalHojaConsumosCorteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.validarImagen();
  }

  validarImagen() {
    console.log(this.data);
    
    if (this.data.hc != undefined && this.data.hc != null) {
      this.image = !!this.data.hc.minutaje_corte ? (publicImageURL + this.data.hc.minutaje_corte) : '';
    }

    if (Object.keys(this.data.tmp).length > 0) {
      this.image = this.data.tmp.file;
    }
  }

  onImageSelected(event): void {
    if (event.length <= 0) { return; }
    const file: File = event[0];
    this.imageName = file.name;

    this.ReadAsBase64(file).then(result => {
      this.imageExtension = result.split(';')[0].split('/')[1];
      this.imageSelected = result;
      this.image = result;
    }).catch(err => console.log(err));
  }

  ReadAsBase64(file): Promise<any> {
    const reader = new FileReader();
    const fileValue = new Promise((resolve, reject) => {
      reader.addEventListener('load', () => {
        resolve(reader.result);
      });
      reader.addEventListener('error', (event) => {
        reject(event);
      });
      reader.readAsDataURL(file);
    })
    return fileValue;
  }

  selectorImgOperaciones(ref) {
    Swal.fire({
      icon: 'question',
      title: '¿Qué desea hacer?',
      cancelButtonText: 'Eliminar imagen',
      confirmButtonText: 'Cambiar imagen',
      showCancelButton: true,
      focusConfirm: true
    }).then((res) => {
      if (res.value === true) {
        ref.click();
      } else if (res.dismiss === Swal.DismissReason.cancel) {
        this.image = '';
        this.imageName = EMPTYFILE;
        this.data.hc.minutaje_corte = '';
      }
    })
  }

  onClose(): void {
    this.dialogRef.close();
  }

  guardarImagen(): void {
    let img =  { extension: this.imageExtension, file: this.image };

    this.dialogRef.close(img);
  }
  
}
