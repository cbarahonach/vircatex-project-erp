import { Component, OnInit, ViewChild, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { ExternoService } from 'src/app/services/externo.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';
import { ModalReporteTextilComponent } from '../modal-reporte-textil/modal-reporte-textil.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tbl-reporte-textil',
  templateUrl: './tbl-reporte-textil.component.html',
  styleUrls: ['./tbl-reporte-textil.component.scss']
})
export class TblReporteTextilComponent implements OnInit {
  @Input() listenReload;
  @Output() setExcelData = new EventEmitter();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ['codigo', 'fabrica', 'cliente', 'fecha_creacion_po', 'po_buy', 'estilo', 'color', 'detalles'];
  dataSource: any;

  constructor(private ExternoService: ExternoService, private Dialog: MatDialog) { }

  ngOnInit() {
    this.listarReportesTextil();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.listenReload.currentValue) {
      this.listarReportesTextil();
    }
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) { this.dataSource.paginator.firstPage(); }
    this.setExcelData.emit({ data: this.dataSource.data, filtered: this.dataSource.filteredData });
  }

  listarReportesTextil(): void {
    this.ExternoService.ListarReporteTextil().subscribe((response) => {
      this.dataSource = new MatTableDataSource(response.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.configPaginator();
      this.setExcelData.emit({ data: this.dataSource.data, filtered: this.dataSource.filteredData });
    }, err => console.log(err));
  }

  configPaginator(): void {
    this.paginator._intl.itemsPerPageLabel = 'Filas por página';
    this.paginator._intl.nextPageLabel = 'Siguiente';
    this.paginator._intl.previousPageLabel = 'Anterior';
  }

  openModal(ficha): void {
    const dialogRef = this.Dialog.open(ModalReporteTextilComponent, {
      data: ficha
    });

    dialogRef.afterClosed().subscribe(result => {
      this.setExcelData.emit({ data: this.dataSource.data, filtered: this.dataSource.filteredData });
    });
  }

  removeRow(row) {
    Swal.fire({
      icon: 'warning',
      text: '¿Seguro que desea eliminar este reporte?',
      showCancelButton: true
    }).then((response) => {
      if (response.value) {
        this.ExternoService.EliminarReporteTextil(row.id)
          .subscribe((response) => {
            if (response.type == 'success') {
              Swal.fire({
                icon: 'success',
                text: response.message
              });
              this.listarReportesTextil();
            }
          }, err => console.log(err));
      }
    })
  }

}
