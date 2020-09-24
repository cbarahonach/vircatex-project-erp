import { Time } from "@angular/common";

export class PersonalModel {
  id: number = 0;
  nombres: string = "";
  apellidos: string = "";
  area: string = "";
  hora_ingreso: Time;
  hora_salida: Time;
  deleted_status: number = 0;
  created_at: string = '';
  updated_at: string = '';
  deleted_at: string = '';
}
