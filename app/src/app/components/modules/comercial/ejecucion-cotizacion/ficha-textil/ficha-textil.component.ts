import { Component, OnInit } from '@angular/core';
import { ComercialService } from 'src/app/services/comercial.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CotizacionesModel } from 'src/app/models/cotizaciones.model';
import Swal from 'sweetalert2';
import { CotizacionesTextilModel } from 'src/app/models/cotizacionesTextil.model';

@Component({
  selector: 'app-ficha-textil',
  templateUrl: './ficha-textil.component.html',
  styleUrls: ['./ficha-textil.component.scss']
})
export class FichaTextilComponent implements OnInit {
  breadcrumb: any = {
    title: "Modulo Comercial",
    items: [
      { name: "Inicio", route: "/home", redirectTo: true },
      { name: "Comercial", route: "/Comercial", redirectTo: true },
      { name: "Ejecución de Cotización", route: "/Comercial/ejecucion-cotizacion", redirectTo: true },
      { name: "Ficha Textil", route: "", redirectTo: false },
    ]
  };
  cotizacion_id: number;
  telas: any[];

  articulo: any[] = [];
  color: any[] = [];
  material: any[] = [];
  ancho: any[] = [];
  densidadA: any[] = [];
  densidadB: any[] = [];
  proveedor: any[] = [];
  precio: any[] = [];

  revirado: any[] = [];
  e_largo: any[] = [];
  e_ancho: any[] = [];

  constructor(
    private ComercialService: ComercialService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.cotizacion_id = params['id'];
      this.buscarCotizacion(this.cotizacion_id);
    });
  }

  buscarCotizacion(id) {
    this.ComercialService.BuscarCotizacionTextilPorId(id).subscribe((response) => {
      if (response.type == 'error') { this.router.navigate(['/404']) }
      else {
        this.setVariables(response.data.cotizacion);
        this.loadTelas(response.data.textil);
      }

    }, err => console.log(err));
  }

  loadTelas(telas) {
    if (telas.length <= 0) { return; }

    for (let tela of telas) {
      this.articulo[tela.tipo] = tela.articulo;
      this.color[tela.tipo] = tela.color;
      this.material[tela.tipo] = tela.titulo_tela;
      this.ancho[tela.tipo] = tela.ancho_total;
      this.densidadA[tela.tipo] = tela.densidad_aw;
      this.densidadB[tela.tipo] = tela.densidad_bw;
      this.proveedor[tela.tipo] = tela.proveedor;
      this.precio[tela.tipo] = tela.precio;
      this.revirado[tela.tipo] = tela.revirado;
      this.e_largo[tela.tipo] = tela.encogimiento_largo;
      this.e_ancho[tela.tipo] = tela.encogimiento_ancho;
    }
  }

  setVariables(data) {
    this.telas = [
      {
        name: 'tipo_tela',
        data: data.tipo_tela,
        title: 'Tipo de Tela',
        size: data.tipo_tela.replace(/ /g, '').length
      },
      {
        name: 'complemento1',
        data: data.complemento1,
        title: 'Complemento de Tela 01',
        size: data.complemento1.replace(/ /g, '').length
      },
      {
        name: 'complemento2',
        data: data.complemento2,
        title: 'Complemento de Tela 02',
        size: data.complemento2.replace(/ /g, '').length
      },
      {
        name: 'complemento3',
        data: data.complemento3,
        title: 'Complemento de Tela 03',
        size: data.complemento3.replace(/ /g, '').length
      },
      {
        name: 'complemento4',
        data: data.complemento4,
        title: 'Complemento de Tela 04',
        size: data.complemento4.replace(/ /g, '').length
      }
    ]
  }

  guardarTela(index) {
    let textil = new CotizacionesTextilModel();
    textil.cotizacion_id = this.cotizacion_id;
    textil.tipo = index;
    textil.articulo = !!this.articulo[index] ? this.articulo[index] : '';
    textil.color = !!this.color[index] ? this.color[index] : '';
    textil.titulo_tela = !!this.material[index] ? this.material[index] : '';
    textil.ancho_total = this.ancho[index] ? this.ancho[index] : '';
    textil.densidad_aw = this.densidadA[index] ? this.densidadA[index] : '';
    textil.densidad_bw = this.densidadB[index] ? this.densidadB[index] : '';
    textil.proveedor = this.proveedor[index] ? this.proveedor[index] : '';
    textil.precio = this.precio[index] ? this.precio[index] : '';
    textil.revirado = this.revirado[index] ? this.revirado[index] : '';
    textil.encogimiento_ancho = this.e_ancho[index] ? this.e_ancho[index] : '';
    textil.encogimiento_largo = this.e_largo[index] ? this.e_largo[index] : '';

    this.ComercialService.RegistrarFichaTextil(textil).subscribe((response) => {
      if (response.type == 'success') {
        Swal.fire({
          icon: 'success',
          title: response.message,
          confirmButtonColor: '#3f51b5',
          focusConfirm: false,
        })
      } else {
        Swal.fire({
          title: 'Ocurrio un error inesperado, intentelo nuevamente.',
          icon: 'warning'
        })
      }

    }, err => console.log(err));

  }
}
