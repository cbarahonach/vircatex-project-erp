import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FileUploader } from 'ng2-file-upload';
import { appURL, publicImageURL } from 'src/app/app.uri.js';
import Swal from 'sweetalert2';

const EMPTYFILE = 'No hay archivos seleccionados.';

@Component({
  selector: 'app-modal-hoja-cotizacion-img',
  templateUrl: './modal-hoja-cotizacion-img.component.html',
  styleUrls: ['./modal-hoja-cotizacion-img.component.scss']
})
export class ModalHojaCotizacionImgComponent implements OnInit {
  uploader: FileUploader = new FileUploader({ url: appURL, disableMultipart: true });
  image1Name: string = EMPTYFILE;
  image2Name: string = EMPTYFILE;
  image3Name: string = EMPTYFILE;
  image1Selected: any = '';
  image2Selected: any = '';
  image3Selected: any = '';
  image1Extension: any = '';
  image2Extension: any = '';
  image3Extension: any = '';
  image1: string = '';
  image2: string = '';
  image3: string = '';

  constructor(
    public dialogRef: MatDialogRef<ModalHojaCotizacionImgComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.validarImagenes();
  }

  validarImagenes() {
    if (this.data.hc != undefined && this.data.hc != null) {
      this.image1 = !!this.data.hc.imagen1 ? (publicImageURL + this.data.hc.imagen1) : '';
      this.image2 = !!this.data.hc.imagen2 ? (publicImageURL + this.data.hc.imagen2) : '';
      this.image3 = !!this.data.hc.imagen3 ? (publicImageURL + this.data.hc.imagen3) : '';
    }

    if(Object.keys(this.data.tmp).length > 0) {
      for(let img in this.data.tmp) {
        if(this.data.tmp[img].extension.length > 0) {
          switch(img) {
            case 'imagen1':
              this.image1 = this.data.tmp[img].file;
              break;
            case 'imagen2':
              this.image2 = this.data.tmp[img].file;
              break;
            case 'imagen3':
              this.image3 = this.data.tmp[img].file;
              break;
          }
        }
      }
    }

  }

  selectorImgOperaciones(img, ref) {
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
        switch (img) {
          case 1:
            this.image1 = '';
            this.image1Name = EMPTYFILE;
            this.data.hc.imagen1 = '';
            break;
          case 2:
            this.image2 = '';
            this.image2Name = EMPTYFILE;
            this.data.hc.imagen2 = '';
            break;
          case 3:
            this.image3 = '';
            this.image3Name = EMPTYFILE;
            this.data.hc.imagen3 = '';
            break;
        }
      }
    })
  }

  onImage1Selected(event): void {
    if (event.length <= 0) { return; }
    const file: File = event[0];
    this.image1Name = file.name;

    this.ReadAsBase64(file).then(result => {
      this.image1Extension = result.split(';')[0].split('/')[1];
      this.image1Selected = result;
      this.image1 = result;
    }).catch(err => console.log(err));
  }

  onImage2Selected(event): void {
    if (event.length <= 0) { return; }
    const file: File = event[0];
    this.image2Name = file.name;

    this.ReadAsBase64(file).then(result => {
      this.image2Extension = result.split(';')[0].split('/')[1];
      this.image2Selected = result;
      this.image2 = result;
    }).catch(err => console.log(err));
  }

  onImage3Selected(event): void {
    if (event.length <= 0) { return; }
    const file: File = event[0];
    this.image3Name = file.name;

    this.ReadAsBase64(file).then(result => {
      this.image3Extension = result.split(';')[0].split('/')[1];
      this.image3Selected = result;
      this.image3 = result;
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

  onClose(): void {
    this.dialogRef.close();
  }

  guardarImagenes(): void {
    const imgBody = {
      imagen1: { extension: this.image1Extension, file: this.image1 },
      imagen2: { extension: this.image2Extension, file: this.image2 },
      imagen3: { extension: this.image3Extension, file: this.image3 }
    }

    this.dialogRef.close(imgBody);
  }
}
