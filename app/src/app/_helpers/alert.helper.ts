import Swal, { SweetAlertResult } from 'sweetalert2';

export class AlertHelper {
    constructor() { }

    public showSwalMessage(data: any, msg: string = null): Promise<SweetAlertResult> {
        let body: any = {
            icon: data.type,
            title: data.message,
            confirmButtonColor: '#3f51b5',
            focusConfirm: false,
        };

        if (msg != null) { body.text = msg }
        return Swal.fire(body);
    }

    public showSwalErrorMessage(text: any): Promise<SweetAlertResult> {
        return Swal.fire({
            icon: 'error',
            title: 'Ocurrio un error...',
            text: text
        });
    }
}