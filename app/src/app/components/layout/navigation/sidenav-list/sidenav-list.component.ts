import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();
  modulos: any[] = [];
  isLoggedIn$: Observable<boolean>;

  constructor(
    private AdminService: AdminService,
    private AuthService: AuthService,
  ) { }

  ngOnInit() {
    this.AuthService.isLoggedIn().subscribe(data => {
      this.modulos = [];
      if (data) { this.ListarModulosDisponibles() }
    }, err => console.log(err));
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

  ListarModulosDisponibles(): void {
    this.AdminService.ListarModulosDisponibles().subscribe((response) => {
      response.data.map(row => {
        this.modulos.push(row.modulo);
      });
      this.modulos = [...new Set(this.modulos)];
    }, err => console.log(err));
  }
}
