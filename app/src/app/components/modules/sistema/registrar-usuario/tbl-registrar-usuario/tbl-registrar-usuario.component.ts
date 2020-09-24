import { Component, OnInit, Input, ViewChild, SimpleChanges } from "@angular/core";
import { AdminService } from "src/app/services/admin.service";
import { UsuariosModel } from "src/app/models/usuarios.model";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";

@Component({
  selector: "app-tbl-registrar-usuario",
  templateUrl: "./tbl-registrar-usuario.component.html",
  styleUrls: ["./tbl-registrar-usuario.component.scss"]
})
export class TblRegistrarUsuarioComponent implements OnInit {
  usuarios: UsuariosModel[] = [];
  @Input() listenReload;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ["codigo", "nombre", "email", "info"];
  dataSource: any;

  constructor(private AdminService: AdminService) { }

  ngOnInit() {
    this.listarUsuarios();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.listenReload.currentValue) {
      this.listarUsuarios();
    }
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  listarUsuarios(): void {
    this.AdminService.ListarUsuarios().subscribe(
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
}
