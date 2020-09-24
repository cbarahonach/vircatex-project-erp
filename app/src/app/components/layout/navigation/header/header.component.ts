import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Observable } from "rxjs";
import _ from "lodash";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  @Output() public sidenavToggle = new EventEmitter();
  app_name: string = "Vircatex ERP";
  isLoggedIn$: Observable<boolean>;

  constructor(private AuthService: AuthService, private router: Router) {}

  ngOnInit() {
    this.isLoggedIn$ = this.AuthService.isLoggedIn();
  }

  onToggleSidenav = () => {
    this.sidenavToggle.emit();
  };

  onLogout(): void {
    this.AuthService.Logout();
  }

  navProfile(): void {
    this.router.navigate(["/perfil"]);
  }
}
