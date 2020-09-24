import { Component, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ComercialService } from 'src/app/services/comercial.service';
import { publicImageURL, publicDefaultURL } from 'src/app/app.uri';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-ejecucion-cotizacion',
  templateUrl: './ejecucion-cotizacion.component.html',
  styleUrls: ['./ejecucion-cotizacion.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class EjecucionCotizacionComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  breadcrumb: any = {
    title: "Modulo Comercial",
    items: [
      { name: "Inicio", route: "/home", redirectTo: true },
      { name: "Comercial", route: "/Comercial", redirectTo: true },
      { name: "Ejecución de Cotización", route: "", redirectTo: false },
    ]
  };

  dataSource: any;
  columnsToDisplay = ['cliente','codigo', 'estilo', 'tipo_tela', 'composicion_tela',];
  headerColumns = ['Cliente', 'Codigo de cotización', 'Estilo', 'Tipo de tela', 'Composición de tela'];
  expandedElement: any | null;
  pathImage = publicImageURL;
  pathDefault = publicDefaultURL;

  constructor(
    private ComercialService: ComercialService
  ) { }

  ngOnInit() {
    this.listarCotizaciones();
  }

  configPaginator(): void {
    this.paginator._intl.itemsPerPageLabel = 'Filas por página';
    this.paginator._intl.nextPageLabel = 'Siguiente';
    this.paginator._intl.previousPageLabel = 'Anterior';
  }

  listarCotizaciones(): void {
    this.ComercialService.ListarCotizaciones().subscribe((response) => {
      this.dataSource = new MatTableDataSource(response.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.configPaginator();
    }, error => console.log(error));
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
