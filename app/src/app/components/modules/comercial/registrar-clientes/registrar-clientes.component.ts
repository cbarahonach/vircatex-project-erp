import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSelect } from '@angular/material';
import { ClientesModel } from 'src/app/models/clientes.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { ComercialService } from 'src/app/services/comercial.service';
import { TokenService } from 'src/app/services/token.service';
import Swal from 'sweetalert2';
import { takeUntil } from 'rxjs/operators';
import { ButtonHelper } from 'src/app/_helpers/button.helper';
import { AlertHelper } from 'src/app/_helpers/alert.helper';

@Component({
  selector: "app-registrar-clientes",
  templateUrl: "./registrar-clientes.component.html",
  styleUrls: ["./registrar-clientes.component.scss"]
})

export class RegistrarClientesComponent implements OnInit {
  breadcrumb: any = {
    title: "Modulo Comercial",
    items: [
      { name: "Inicio", route: "/home", redirectTo: true },
      { name: "Comercial", route: "/Comercial", redirectTo: true },
      { name: "Registrar cliente", route: "", redirectTo: false }
    ]
  };
  swalAlert: AlertHelper = new AlertHelper();
  buttonHelper: ButtonHelper = new ButtonHelper();
  @ViewChild("singleSelect", { static: true }) singleSelect: MatSelect;
  cliente: ClientesModel;
  regclienteForm: FormGroup;
  paises: any;
  tipos_clientes: any;
  divisiones: any;
  volumenes: any;
  paisFiltrado: ReplaySubject<any> = new ReplaySubject<any>(1);
  tcFiltrado: ReplaySubject<any> = new ReplaySubject<any>(1);
  divisionFiltrado: ReplaySubject<any> = new ReplaySubject<any>(1);
  volumenFiltrado: ReplaySubject<any> = new ReplaySubject<any>(1);
  _onDestroy = new Subject<void>();
  formSaved: boolean = false;

  spinnerButton = this.buttonHelper.getSpinnerButton('Registrar');

  constructor(
    private formBuilder: FormBuilder,
    private ComercialService: ComercialService,
    private TokenService: TokenService
  ) { }

  ngOnInit() {
    this.configurarFormulario();
    this.listarUtilidades();
    this.onChanges();
  }


  onChanges() {
    this.regclienteForm.statusChanges.subscribe(result =>
      result == "VALID"
        ? (this.spinnerButton.disabled = false)
        : (this.spinnerButton.disabled = true)
    );

    this.regclienteForm.controls.paisBuscador.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filtrarPaises();
      });

    this.regclienteForm.controls.tcBuscador.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filtrarTC();
      });

    this.regclienteForm.controls.divisionBuscador.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filtrarDivisiones();
      });

    this.regclienteForm.controls.volumenBuscador.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filtrarVolumenes();
      });
  }

  filtrarPaises(): void {
    if (!this.paises) {
      return;
    }
    let buscar = this.regclienteForm.controls.paisBuscador.value;
    if (!buscar) {
      this.paisFiltrado.next(this.paises.slice());
      return;
    } else {
      buscar = buscar.toLowerCase();
    }
    this.paisFiltrado.next(
      this.paises.filter(pais => pais.nombre.toLowerCase().indexOf(buscar) > -1)
    );
  }

  filtrarTC(): void {
    if (!this.tipos_clientes) {
      return;
    }
    let buscar = this.regclienteForm.controls.tcBuscador.value;
    if (!buscar) {
      this.tcFiltrado.next(this.tipos_clientes.slice());
      return;
    } else {
      buscar = buscar.toLowerCase();
    }
    this.tcFiltrado.next(
      this.tipos_clientes.filter(
        tc => tc.nombre.toLowerCase().indexOf(buscar) > -1
      )
    );
  }

  filtrarDivisiones(): void {
    if (!this.divisiones) {
      return;
    }
    let buscar = this.regclienteForm.controls.divisionBuscador.value;
    if (!buscar) {
      this.divisionFiltrado.next(this.divisiones.slice());
      return;
    } else {
      buscar = buscar.toLowerCase();
    }
    this.divisionFiltrado.next(
      this.divisiones.filter(
        divisiones => divisiones.nombre.toLowerCase().indexOf(buscar) > -1
      )
    );
  }

  filtrarVolumenes(): void {
    if (!this.volumenes) {
      return;
    }
    let buscar = this.regclienteForm.controls.volumenBuscador.value;
    if (!buscar) {
      this.volumenFiltrado.next(this.volumenes.slice());
      return;
    } else {
      buscar = buscar.toLowerCase();
    }
    this.volumenFiltrado.next(
      this.volumenes.filter(
        volumen => volumen.rango.toLowerCase().indexOf(buscar) > -1
      )
    );
  }

  configurarFormulario(): void {
    this.regclienteForm = this.formBuilder.group({
      cliente: ["", [Validators.required]],
      pais: ["", [Validators.required]],
      paisBuscador: [""],
      tc: ["", [Validators.required]],
      tcBuscador: [""],
      nombreContacto: [""],
      correoContacto: ["", [Validators.email]],
      telefonoContacto: [""],
      division: ["", [Validators.required]],
      divisionBuscador: [""],
      volumen: ["", [Validators.required]],
      volumenBuscador: [""]
    });
  }

  listarUtilidades(): void {
    this.ComercialService.UtilidadesRegistrarCliente().subscribe(
      response => {
        this.paises = response.data.paises;
        this.tipos_clientes = response.data.tipos_clientes;
        this.divisiones = response.data.divisiones;
        this.volumenes = response.data.volumenes;

        this.paisFiltrado.next(this.paises.slice());
        this.tcFiltrado.next(this.tipos_clientes.slice());
        this.divisionFiltrado.next(this.divisiones.slice());
        this.volumenFiltrado.next(this.volumenes.slice());
      },
      err => console.log(err)
    );
  }

  setClienteRegistrado(info): ClientesModel {
    let cliente = new ClientesModel();
    cliente.nombre = info.cliente;
    cliente.pais_id = info.pais;
    cliente.tc_id = info.tc;
    cliente.contacto_nombre = info.nombreContacto;
    cliente.contacto_email = info.correoContacto;
    cliente.contacto_telefono = info.telefonoContacto;
    cliente.division_id = info.division;
    cliente.volumen_id = info.volumen;
    cliente.usuario_id = this.TokenService.GetPayload().id;

    return cliente;
  }

  registrarCliente(): void {
    if (!this.regclienteForm.valid || this.formSaved) {
      return;
    }
    this.formSaved = true;
    this.spinnerButton.active = true;

    this.cliente = this.setClienteRegistrado(this.regclienteForm.value);

    this.ComercialService.RegistrarCliente(this.cliente).subscribe(
      response => {
        this.swalAlert.showSwalMessage(response)
          .then(() => this.clearForm(response.type))
      },
      err => {
        Swal.fire({ icon: "error", title: "Ocurrio un error", text: err });
        this.clearForm('error');
      }
    );
  }

  clearForm(type) {
    this.formSaved = false;
    this.spinnerButton.active = false;

    if (type == 'success') { this.regclienteForm.reset(); }
  }

}
