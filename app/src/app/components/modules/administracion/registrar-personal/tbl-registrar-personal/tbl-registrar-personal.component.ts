import { Component, OnInit, Input, ViewChild, SimpleChanges, Inject } from "@angular/core";
import { PersonalModel } from "src/app/models/personal.model";
import { MatPaginator, MatSort, MatTableDataSource, MAT_DIALOG_DATA } from "@angular/material";
import { AdministracionService } from "src/app/services/administracion.service";
import { NgForm, Validators } from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: "app-tbl-registrar-personal",
  templateUrl: "./tbl-registrar-personal.component.html",
  styleUrls: ["./tbl-registrar-personal.component.scss"]
})
export class TblRegistrarPersonalComponent implements OnInit {
  personal: PersonalModel[] = [];
  @Input() listenReload;
  @ViewChild("myForm", { static: false }) myForm: NgForm;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ["codigo", "nombre_completo", "info", "delete"];
  dataSource: any;

  constructor(private AdministracionService: AdministracionService) { }

  ngOnInit() {
    this.listarPersonal();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.listenReload.currentValue) {
      this.listarPersonal();
    }
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  listarPersonal(): void {
    this.AdministracionService.ListarPersonal().subscribe(
      response => {
        this.dataSource = new MatTableDataSource(response.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.configPaginator();
      },
      err => console.log(err)
    );
  }

  deletePersonal(eliminar) {
    let id = {
      id: eliminar.id
    };

    this.AdministracionService.EliminarPersonal(id).subscribe(
      response => {
        if (response.type == "success") {
          Swal.fire({
            icon: "success",
            text: response.message,
            confirmButtonColor: "#0069d9",
            confirmButtonText: "Aceptar"
          }).then(() => {
            this.listarPersonal();
          });
        }
      },
      err => {
        Swal.fire({
          icon: "error",
          text: err
        });
      }
    );
  }

  configPaginator(): void {
    this.paginator._intl.itemsPerPageLabel = "Filas por página";
    this.paginator._intl.nextPageLabel = "Siguiente";
    this.paginator._intl.previousPageLabel = "Anterior";
  }
}
