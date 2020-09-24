import { Component, OnInit } from '@angular/core';
import { ExporterService } from 'src/app/services/exporter.service';
import { DownloadFileURL } from 'src/app/app.uri.js';

@Component({
  selector: 'app-reporte-textil',
  templateUrl: './reporte-textil.component.html',
  styleUrls: ['./reporte-textil.component.scss']
})
export class ReporteTextilComponent implements OnInit {
  breadcrumb: any = {
    title: "Seccion Temporal",
    items: [
      { name: "Inicio", route: "/home", redirectTo: true },
      { name: "Externo", route: "/Externo", redirectTo: true },
      { name: "Reporte textil", route: "", redirectTo: false },
    ]
  };

  reloadTable: any;
  ExcelData: any;
  FileFormatURL = DownloadFileURL + 'excel/FormatoExcelReporteTextil';

  constructor(private ExporterService: ExporterService) { }

  ngOnInit() {
  }

  listenForm(event): void {
    this.reloadTable = event;
  }

  listenTable(event): void {
    this.ExcelData = event;
  }

  exportAllData(): void {
    this.ExporterService.exportToExcel(this.ExcelData.filtered, 'Reporte Textil');
  }

}
