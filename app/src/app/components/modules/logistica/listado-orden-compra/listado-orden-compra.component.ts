import {
  Component,
  OnInit,
  Input,
  ViewChild,
  SimpleChanges
} from "@angular/core";
import { LogisticaService } from "src/app/services/logistica.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import * as moment from "moment";
import "moment/min/locales";
import { ExporterService } from "src/app/services/exporter.service";
import { AdminService } from "src/app/services/admin.service";
import { OrdenComprasServiciosModel } from "src/app/models/OrdenComprasServiciosModel.model";


@Component({
  selector: 'app-listado-orden-compra',
  templateUrl: './listado-orden-compra.component.html',
  styleUrls: ['./listado-orden-compra.component.scss']
})
export class ListadoOrdenCompraComponent implements OnInit {
  //variables
  regOrdenCompraForm: FormGroup;
  igv: number = 0;
  datos: any[] = [];
  breadcrumb: any = {
    title: "Modulo Logistica",
    items: [
      { name: "Inicio", route: "/home", redirectTo: true },
      { name: "Logistica", route: "/Logistica", redirectTo: true },
      { name: "Listado de Ordenes", route: "", redirectTo: false }
    ]
  };

  ordenes: OrdenComprasServiciosModel[] = [];
  @Input() listenReload;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = [
    "codigo",
    "tipo_orden",
    "proveedor",
    "usuario",
    "fecha_entrega",
    "acciones"
  ];
  dataSource: any;

  constructor(
    private formBuilder: FormBuilder,
    private LogisticaService: LogisticaService,
    private ExporterService: ExporterService,
    private AdminService: AdminService
  ) { }

  ngOnInit() {
    this.listarOrdenCompra();
    this.detallesSistema();
    this.configurarFormulario();
  }
  

  configurarFormulario() {
    this.regOrdenCompraForm = this.formBuilder.group({
      tipo_orden: [""]
    });
  }
  detallesSistema() {
    this.AdminService.DetallesSistema().subscribe(
      response => {
        this.igv = (response.data.igv);
      },
      err => console.log(err)
    );
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.listenReload.currentValue) {
      this.listarOrdenCompra();
    }
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  listarOrdenCompra(): void {
    this.LogisticaService.ListarOrdenes().subscribe(
      response => {
        console.log(response.data);
        
        let rs = this.processData(response.data);
        console.log(rs);
        
        this.dataSource = new MatTableDataSource(rs);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.configPaginator();
      },
      err => console.log(err)
    );
  }

  showOrden(item) {
    let text = '';
    switch (item.tipo_orden) {
      case 1:
        text = 'COMPRA';
        break;
      case 2:
        text = 'SERVICIO';
        break;
    }

    return text;
  }

  showCode(item) {
    let text = '';
    switch (item.tipo_orden) {
      case 1:
        text = item.codigo_orden_compras;
        break;
      case 2:
        text = item.codigo_orden_compras_servicios;
        break;
    }

    return text;
  }

  processData(data): Array<any> {
    let rs = [];
    data.ordenCompra.map((item) => rs.push(item));
    data.ordenServicio.map((item) => rs.push(item));
    return rs;
  }

  configPaginator(): void {
    this.paginator._intl.itemsPerPageLabel = "Filas por página";
    this.paginator._intl.nextPageLabel = "Siguiente";
    this.paginator._intl.previousPageLabel = "Anterior";
  }
  setDateFormat(date) {
    return moment(date.split(" ")[0])
      .locale("es")
      .format("LL");
  }

  async generarPdf(data) {
    this.LogisticaService.ListarOrdenCompraItemPorId(data.id).subscribe(
      response => {
        let items = response.data;
        let total = 0;
        let total_filas = 0;
        items.map(item => {
          total_filas++;
          total += parseFloat(item.cantidad) * parseFloat(item.precio_unitario);
        });
        
        let oc = {
          info: data,
          items_data: items,
          total: total,
          total_filas: total_filas,
          igv: (this.igv * total).toFixed(2)
        };
        this.ExporterService.generarPdf(oc);
      },
      err => console.log(err)
    );
  }

  eliminarOrdenCompra(data) {
    this.LogisticaService.EliminarOrdenCompraId(data.id).subscribe(
      response => {
      },
      err => console.log(err)
    );
    this.listarOrdenCompra();
  }

  actualizarOrdenCompra(data) {

  }

}

