import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExternoService } from 'src/app/services/externo.service';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { ModalReporteManufacturaComponent } from '../modal-reporte-manufactura/modal-reporte-manufactura.component';
import { ExporterService } from 'src/app/services/exporter.service';

@Component({
  selector: 'app-tbl-info-manufactura',
  templateUrl: './tbl-info-manufactura.component.html',
  styleUrls: ['./tbl-info-manufactura.component.scss']
})
export class TblInfoManufacturaComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  breadcrumb: any = {
    title: "Modulo Externo",
    items: [
      { name: "Inicio", route: "/home", redirectTo: true },
      { name: "Externo", route: "/Externo", redirectTo: true },
      { name: "Reporte Manufactura", route: "/Externo/reporte-manufactura", redirectTo: true },
      { name: "Reportes", route: '', redirectTo: false }
    ]
  };
  reporteManufacturaId: number;
  jsonData: any;
  displayedColumns: string[] = ['programa', 'cliente', 'po', 'style', 'tipo_prenda', 'color', 'info'];
  dataSource: any;

  constructor(
    private route: ActivatedRoute,
    private ExternoService: ExternoService,
    private Dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private ExporterService: ExporterService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.reporteManufacturaId = params['id'];
      this.BuscarReporteManufactura(this.reporteManufacturaId);
    });
  }

  configPaginator(): void {
    this.paginator._intl.itemsPerPageLabel = 'Filas por página';
    this.paginator._intl.nextPageLabel = 'Siguiente';
    this.paginator._intl.previousPageLabel = 'Anterior';
  }

  BuscarReporteManufactura(codigo): void {
    this.ExternoService.BuscarReporteManufactura({ id: codigo }).subscribe((response) => {
      this.jsonData = JSON.parse(response.data.data_json);
      this.dataSource = new MatTableDataSource(this.jsonData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.configPaginator();
    }, err => console.log(err));
  }

  openDialog(row, index): void {
    const dialogRef = this.Dialog.open(ModalReporteManufacturaComponent, {
      data: { data: row, position: index },
      position: {
        top: '20px'
      },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        result.data = Object.keys(result.data).reduce((c, k) => (c[k.toUpperCase()] = result.data[k], c), {});
        this.jsonData[result.position] = result.data;
        this.dataSource = new MatTableDataSource(this.jsonData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.guardarReportesCliente(this.jsonData);
      }
    });
  }

  

  guardarReportesCliente(data): void {
    const body = {
      id: this.reporteManufacturaId,
      data: data
    }
    this.ExternoService.ActualizarReporteManufactura(body).subscribe((response) => {
      this._snackBar.open(response.message, 'cerrar', {
        duration: 3000,
        verticalPosition: "top",
      });

    }, err => console.log(err));
  }

  exportAllData() {
    this.ExporterService.exportToExcel(this.dataSource.data, 'Reporte Manufactura');
  }

}
