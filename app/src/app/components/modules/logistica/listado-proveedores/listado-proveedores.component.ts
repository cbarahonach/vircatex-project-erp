import {
  Component,
  OnInit,
  Input,
  ViewChild,
  SimpleChanges
} from "@angular/core";
import { LogisticaService } from "src/app/services/logistica.service";
import { FormBuilder } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import "moment/min/locales";
import { ProveedoresModel } from "src/app/models/proveedores.model";

@Component({
  selector: 'app-listado-proveedores',
  templateUrl: './listado-proveedores.component.html',
  styleUrls: ['./listado-proveedores.component.scss']
})
export class ListadoProveedoresComponent implements OnInit {

    breadcrumb: any = {
    title: "Modulo Logistica",
    items: [
      { name: "Inicio", route: "/home", redirectTo: true },
      { name: "Logistica", route: "/Logistica", redirectTo: true },
      { name: "Listado de Proveedores", route: "", redirectTo: false }
    ]
  };

  proveedores: ProveedoresModel[] = [];
  @Input() listenReload;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = [
    "index",
    "razon_social",
    "telefono",
    "ruc",
    "num_cuenta",
    "acciones"
  ];
  dataSource: any;


  constructor(
    private formBuilder: FormBuilder,
    private LogisticaService: LogisticaService,
  ) { 
    
  }

  ngOnInit() {
    this.listarProveedores();
    

  }

  listarProveedores():void {
    this.LogisticaService.ListarProveedores().subscribe(
      response => {
        let rs =response.data;
        this.dataSource = new MatTableDataSource(rs);
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

  ngOnChanges(changes: SimpleChanges) {
    if (changes.listenReload.currentValue) {
      this.listarProveedores();
    }
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  eliminarProveedor(data) {
    this.LogisticaService.EliminarProveedorId(data.id).subscribe(
      response => {
      },
      err => console.log(err)
    );
    this.listarProveedores();
  }


}
