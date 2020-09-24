import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ComercialService } from "src/app/services/comercial.service";
import { FormGroup, FormBuilder } from "@angular/forms";
import { MatProgressButtonOptions } from "mat-progress-buttons";
import Swal from "sweetalert2";
import { ReplaySubject, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { ButtonHelper } from 'src/app/_helpers/button.helper';
import { AlertHelper } from 'src/app/_helpers/alert.helper';

@Component({
  selector: "app-detalle-cliente",
  templateUrl: "./detalle-cliente.component.html",
  styleUrls: ["./detalle-cliente.component.scss"]
})
export class DetalleClienteComponent implements OnInit {
  clienteId: number;
  breadcrumb: any = {
    title: "Modulo Comercial",
    items: [
      { name: "Inicio", route: "/home", redirectTo: true },
      { name: "Comercial", route: "/Comercial", redirectTo: true },
      {
        name: "Listado de  clientes",
        route: "/Comercial/listado-clientes",
        redirectTo: true
      },
      { name: "Detalles de cliente", route: "", redirectTo: false }
    ]
  };
  swalAlert: AlertHelper = new AlertHelper();
  buttonHelper: ButtonHelper = new ButtonHelper();
  detalles: any;
  detallesForm: FormGroup;
  regClientes: FormGroup;
  readFrm: boolean = true;
  paises: any;
  tipos_clientes: any;
  divisiones: any;
  volumenes: any;
  paisFiltrado: ReplaySubject<any> = new ReplaySubject<any>(1);
  tcFiltrado: ReplaySubject<any> = new ReplaySubject<any>(1);
  divisionFiltrado: ReplaySubject<any> = new ReplaySubject<any>(1);
  volumenFiltrado: ReplaySubject<any> = new ReplaySubject<any>(1);
  _onDestroy = new Subject<void>();

  spinnerButton: MatProgressButtonOptions = this.buttonHelper.getSpinnerButton('Guardar');

  constructor(
    private route: ActivatedRoute,
    private ComercialService: ComercialService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.configForm();
    this.listarUtilidades();
    this.route.params.subscribe(params => {
      this.clienteId = params["id"];
      this.BuscarClientePorId(this.clienteId);
    });
    this.onChanges();
  }

  BuscarClientePorId(id: number) {
    this.ComercialService.BuscarCliente(id).subscribe(
      response => {
        if (response.data.length <= 0) {
          this.router.navigate(["/notfound"]);
        } else {
          this.inicializarDet(response.data);
        }
      },
      err => console.log(err)
    );
  }

  onChanges() {
    this.detallesForm.statusChanges.subscribe(result =>
      result == "VALID"
        ? (this.spinnerButton.disabled = false)
        : (this.spinnerButton.disabled = true)
    );

    this.detallesForm.controls.paisBuscador.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filtrarPaises();
      });

    this.detallesForm.controls.tcBuscador.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filtrarTC();
      });

    this.detallesForm.controls.divisionBuscador.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filtrarDivisiones();
      });

    this.detallesForm.controls.volumenBuscador.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filtrarVolumenes();
      });
  }

  filtrarPaises(): void {
    if (!this.paises) {
      return;
    }
    let buscar = this.detallesForm.controls.paisBuscador.value;
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
    let buscar = this.detallesForm.controls.tcBuscador.value;
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
    let buscar = this.detallesForm.controls.divisionBuscador.value;
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
    let buscar = this.detallesForm.controls.volumenBuscador.value;
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

  inicializarDet(data: any) {
    this.detallesForm.controls.cliente.setValue(data.nombre);
    this.detallesForm.controls.pais.setValue(data.pais_id);
    this.detallesForm.controls.tc.setValue(data.tc_id);
    this.detallesForm.controls.nombreContacto.setValue(data.contacto_nombre);
    this.detallesForm.controls.correoContacto.setValue(data.contacto_email);
    this.detallesForm.controls.telefonoContacto.setValue(
      data.contacto_telefono
    );
    this.detallesForm.controls.division.setValue(data.division_id);
    this.detallesForm.controls.volumen.setValue(data.volumen_id);
  }

  configForm() {
    this.detallesForm = this.formBuilder.group({
      cliente: [""],
      pais: [""],
      paisBuscador: [""],
      tc: [""],
      tcBuscador: [""],
      nombreContacto: [""],
      correoContacto: [""],
      telefonoContacto: [""],
      division: [""],
      divisionBuscador: [""],
      volumen: [""],
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

  registrarClientesDetalles() {
    const cliente = {
      nombre: this.detallesForm.controls.cliente.value,
      pais_id: this.detallesForm.controls.pais.value,
      tc_id: this.detallesForm.controls.tc.value,
      contacto_nombre: this.detallesForm.controls.nombreContacto.value,
      contacto_email: this.detallesForm.controls.correoContacto.value,
      contacto_telefono: this.detallesForm.controls.telefonoContacto.value,
      division_id: this.detallesForm.controls.division.value,
      volumen_id: this.detallesForm.controls.volumen.value,
      id: this.clienteId
    };

    this.ComercialService.ActualizarClientes(cliente).subscribe(
      response => {
        this.swalAlert.showSwalMessage(response)
          .then(() => this.readFrm = true)
      },
      err => {
        Swal.fire({ icon: "error", title: "Ocurrio un error", text: err });
      }
    );
  }

  statusFrm(status) {
    //EDIT OR READ FRM
    this.readFrm = status;
  }
}
