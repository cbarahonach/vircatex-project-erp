import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges } from "@angular/core";
import { ComercialService } from "src/app/services/comercial.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { ExporterService } from 'src/app/services/exporter.service';

@Component({
  selector: "app-listado-clientes",
  templateUrl: "./listado-clientes.component.html",
  styleUrls: ["./listado-clientes.component.scss"]
})
export class ListadoClientesComponent implements OnInit, OnChanges {
  @Input() listenReload;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ["codigo", "cliente", "volumen", "pais", "division", "info"];
  dataSource: any;

  breadcrumb: any = {
    title: "Modulo Comercial",
    items: [
      { name: "Inicio", route: "/home", redirectTo: true },
      { name: "Comercial", route: "/Comercial", redirectTo: true },
      { name: "Listado de  clientes", route: "", redirectTo: false }
    ]
  };

  constructor(
    private ComercialService: ComercialService,
    private ExporterService: ExporterService
  ) { }

  ngOnInit() {
    this.listarClientes();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (Number(changes.listenReload.currentValue) >= 0) {
      this.listarClientes();
    }
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  listarClientes(): void {
    this.ComercialService.ListarClientes().subscribe(
      response => {
        this.dataSource = new MatTableDataSource(response.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.configPaginator();

      },
      err => console.log(err)
    );
  }

  configPaginator(): void {
    this.paginator._intl.itemsPerPageLabel = "Filas por página";
    this.paginator._intl.nextPageLabel = "Siguiente";
    this.paginator._intl.previousPageLabel = "Anterior";
  }

  exportExcel(): void {
    this.ExporterService.exportToExcel(this.dataSource.filteredData, 'Listado de clientes');
  }
}
