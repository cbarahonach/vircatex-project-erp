import { Component, OnInit, Input, ViewChild, SimpleChanges } from '@angular/core';
import { ModulosModel } from 'src/app/models/modulos.model';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-tbl-registrar-modulo',
  templateUrl: './tbl-registrar-modulo.component.html',
  styleUrls: ['./tbl-registrar-modulo.component.scss']
})
export class TblRegistrarModuloComponent implements OnInit {
  usuarios: ModulosModel[] = [];
  @Input() listenReload;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ['codigo', 'nombre', 'ruta', 'info'];
  dataSource: any;

  constructor(private AdminService: AdminService) { }

  ngOnInit() {
    this.listarModulos();
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes.listenReload.currentValue) {
      this.listarModulos();
    }
  }
  
  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  listarModulos(): void {
    this.AdminService.ListarModulos().subscribe((response) => {
      this.dataSource = new MatTableDataSource(response.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.configPaginator();
    }, err => console.log(err));
  }

  configPaginator(): void {
    this.paginator._intl.itemsPerPageLabel = 'Filas por página';
    this.paginator._intl.nextPageLabel = 'Siguiente';
    this.paginator._intl.previousPageLabel = 'Anterior';
  }

}
