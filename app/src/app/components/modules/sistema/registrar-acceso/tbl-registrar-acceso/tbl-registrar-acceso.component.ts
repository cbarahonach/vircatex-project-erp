import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tbl-registrar-acceso',
  templateUrl: './tbl-registrar-acceso.component.html',
  styleUrls: ['./tbl-registrar-acceso.component.scss']
})
export class TblRegistrarAccesoComponent implements OnInit {
  @Input() listenReload;

  constructor() { }

  ngOnInit() {
  }

}
