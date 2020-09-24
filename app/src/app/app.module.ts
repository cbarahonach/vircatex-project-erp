import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ImportsModule } from "./modules/imports.module";
import { AppRoutingModule } from "./modules/app-routing.module";
import { CookieService } from "ngx-cookie-service";
import { MaterialModule } from "./modules/material.module";
import { HeaderComponent } from "./components/layout/navigation/header/header.component";
import { SidenavListComponent } from "./components/layout/navigation/sidenav-list/sidenav-list.component";
import { ComercialRoutingModule } from "./modules/routes/comercial-rounting.module";
import { ExternoRoutingModule } from "./modules/routes/externo-routing.module";
import { SistemasRoutingModule } from "./modules/routes/sistemas-routing.module";
import { AdministracionRoutingModule } from "./modules/routes/administracion-routing.module";
import { LogisticaRoutingModule } from "./modules/routes/logistica-routing.module";

@NgModule({
  declarations: [AppComponent, HeaderComponent, SidenavListComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ImportsModule,
    AppRoutingModule,
    ComercialRoutingModule,
    ExternoRoutingModule,
    SistemasRoutingModule,
    AdministracionRoutingModule,
    LogisticaRoutingModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
