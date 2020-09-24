import { Component, OnInit, Input, SimpleChanges, ViewChild } from '@angular/core';
import { ExternoService } from 'src/app/services/externo.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import * as moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tbl-reporte-cliente-manufactura',
  templateUrl: './tbl-reporte-cliente-manufactura.component.html',
  styleUrls: ['./tbl-reporte-cliente-manufactura.component.scss']
})
export class TblReporteClienteManufacturaComponent implements OnInit {
  @Input() updateTable;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ['codigo', 'cliente', 'usuario', 'created', 'updated', 'info'];
  dataSource: any;

  constructor(
    private ExternoService: ExternoService
  ) { }

  ngOnInit() {
    this.ListarReportesManufactura();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.updateTable.currentValue) {
      this.ListarReportesManufactura();
    }
  }

  configPaginator(): void {
    this.paginator._intl.itemsPerPageLabel = 'Filas por página';
    this.paginator._intl.nextPageLabel = 'Siguiente';
    this.paginator._intl.previousPageLabel = 'Anterior';
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ListarReportesManufactura(): void {
    this.ExternoService.ListarReporteManufactura().subscribe((response) => {
      this.dataSource = new MatTableDataSource(response.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.configPaginator();
    }, err => console.log(err));
  }

  formatDate(date) {
    if (date == null) { return '-'; }

    return moment(date.split(" ")[0]).locale('es').format("dddd Do MMMM YYYY, h:mm:ss a");
  }

  removeClient(row) {
    Swal.fire({
      icon: 'warning',
      title: '¿Seguro que quiere eliminar el cliente?',
      showCancelButton: true
    }).then((response) => {
      if (response.value) {
        this.ExternoService.EliminarReporteManufatura(row.id)
          .subscribe(response => {
            if(response.type == 'success') {
              Swal.fire({
                icon: 'success',
                text: response.message
              });
              this.ListarReportesManufactura();
            }
          }, err => console.log(err));
      }
    })
  }
}
