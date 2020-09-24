import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import * as moment from 'moment';
import * as jsPDF from 'jspdf';
import { publicDefaultURL } from 'src/app/app.uri.js';
import { AdminService } from 'src/app/services/admin.service';


const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';
const EXCEL_EXT = '.xlsx';

@Injectable()
export class ExporterService {

  constructor() { }

  exportToExcel(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workBook: XLSX.WorkBook = {
      Sheets: { 'data': worksheet },
      SheetNames: ['data']
    };

    const excelBuffer: any = XLSX.write(workBook, { bookType: 'xlsx', type: 'array', Props: { Author: "Vircatex" } });
    // call method Buffer and Filename
    this.saveAsExcel(excelBuffer, excelFileName);
  }

  private saveAsExcel(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + ' ' + moment().format('YYYYMMDDHHmmss') + EXCEL_EXT);
  }

  private formatHeader(json: any[]): any {
    json = json.map(row => {
      for (let key in row) {
        const newKey = key.replace(/_/g, ' ').toUpperCase();
        row[newKey] = row[key];
        delete row[key];
      }
      return row;
    });


    return json;
  }

  // here

  generarPdf(oc) {

    const desc_producto = 'DESCRIPCIÓN DEL PRODUCTO';
    const desc_servicio = 'DESCRIPCIÓN DEL SERVICIO';
    const doc = new jsPDF();
    //img
    var img = new Image();
    img.onload = function () {
      doc.addImage(this, 10, 1);
    };
    img.crossOrigin = "";
    img.src = publicDefaultURL + "vircatex_logo.jpg";
    doc.addImage(img, "JPG", 7, 2, 70, 17);

    doc.setFontSize(8);
    doc.setDrawColor(0);
    doc.setFillColor(209, 209, 209);
    doc.setFontType("bold");
    doc.text(5, 22, "VIRCATEX INTERNATIONAL TRADING S.A.C");
    //orden compra vit
    if (oc.info.tipo_orden == 1) {
      doc.text(160, 5, "ORDEN DE COMPRA N° " + oc.info.codigo_orden_compras);
    } else {
      doc.text(160, 5, "ORDEN DE SERVICIO N° " + oc.info.codigo_orden_compras_servicios);
    }

    doc.setFontSize(9);
    doc.text(5, 28, "RUC: ");
    doc.text(40, 28, oc.info.prov_ruc);
    doc.text(5, 32, "TELEFONO: ");
    doc.text(40, 32, oc.info.prov_telefono);
    doc.text(5, 36, "DIRECCION : ");
    doc.text(40, 36, "CALLE NUGGET 386, AGUSTINO , LIMA");

    // caja proveedor
    doc.setDrawColor(0);
    doc.setFillColor(209, 209, 209);
    doc.rect(5, 45, 115, 10, "FD"); //proveedor
    doc.text(50, 51, "PROVEEDOR");
    doc.setDrawColor(0);
    doc.setFillColor(209, 209, 209);
    doc.rect(5, 55, 30, 10, "FD"); //RAZON SOCIAL
    doc.text(7, 61, "RAZON SOCIAL : ");
    doc.setDrawColor(0);
    doc.setFillColor(209, 209, 209);
    doc.rect(5, 65, 30, 10, "FD"); //ruc
    doc.text(7, 71, "RUC : ");
    doc.setDrawColor(0);
    doc.setFillColor(209, 209, 209);
    doc.rect(5, 75, 30, 10, "FD"); //direccion
    doc.text(7, 81, "DIRECCION : ");
    doc.setDrawColor(0);
    doc.setFillColor(209, 209, 209);
    doc.rect(5, 85, 30, 10, "FD"); //telefono
    doc.text(7, 91, "TELEFONO : ");
    doc.setDrawColor(0);
    doc.setFillColor(209, 209, 209);
    doc.rect(5, 95, 30, 10, "FD"); //correo
    doc.text(7, 101, "CORREO : ");

    doc.setFontType("normal");
    doc.rect(35, 55, 85, 10); //RAZON SOCIAL contenido
    doc.text(37, 61, oc.info.prov_razon_social);
    doc.rect(35, 65, 85, 10); //ruc contenido
    doc.text(37, 71, oc.info.prov_ruc);
    doc.rect(35, 75, 85, 10); //direccion contenido
    doc.text(37, 81, oc.info.prov_direccion.toLowerCase().substring(0, 55) + '..');
    doc.rect(35, 85, 85, 10); //telefono  contenido
    doc.text(37, 91, oc.info.prov_telefono);
    doc.rect(35, 95, 85, 10); //correo  contenido
    doc.text(37, 101, oc.info.prov_correo);

    doc.setFontSize(8);
    doc.setFontType("bold");
    //COTIZACION FECHA Y PROVEEDOR
    doc.setDrawColor(0);
    doc.setFillColor(209, 209, 209);
    doc.rect(120, 21, 40, 6, "FD"); //cotizacion
    doc.text(122, 26, "COTIZACION :");
    doc.setDrawColor(0);
    doc.setFillColor(209, 209, 209);
    doc.rect(120, 27, 40, 6, "FD"); //FECHA
    doc.text(122, 32, "FECHA :");
    doc.setDrawColor(0);
    doc.setFillColor(209, 209, 209);
    doc.rect(120, 33, 40, 6, "FD"); //ID PROVEEDOR
    doc.text(122, 38, "ID PROVEEDOR :");

    doc.setFontType("normal");
    doc.rect(160, 21, 40, 6); //cotizacion contenido
    doc.text(162, 26, "-");
    doc.rect(160, 27, 40, 6); //FECHA contenido
    doc.text(162, 31, moment().format("DD/MM/YYYY"));
    doc.rect(160, 33, 40, 6); //ID PROVEEDOR contenido
    doc.text(162, 38, oc.info.proveedor_id.toString());
    doc.setFontSize(9);

    //formas de pago | contra entrega derecha proveedor
    doc.setFontType("bold");
    doc.setDrawColor(0);
    doc.setFillColor(209, 209, 209);
    doc.rect(120, 45, 40, 10, "FD"); // forma de pago
    doc.text(122, 51, "FORMA DE PAGO : ");
    doc.setDrawColor(0);
    doc.setFillColor(209, 209, 209);
    doc.rect(120, 55, 40, 10, "FD"); // moneda
    doc.text(122, 61, "MONEDA : ");
    doc.setDrawColor(0);
    doc.setFillColor(209, 209, 209);
    doc.rect(120, 65, 40, 10, "FD"); // banco
    doc.text(122, 71, "BANCO : ");
    doc.setDrawColor(0);
    doc.setFillColor(209, 209, 209);
    doc.rect(120, 75, 40, 10, "FD"); // numero de cuenta
    doc.text(122, 81, "N° DE CUENTA(CCI) : ");

    doc.setFontType("normal");
    doc.rect(160, 45, 40, 10); // forma de pago contenido
    doc.text(162, 51, oc.info.fp_nombre);
    doc.rect(160, 55, 40, 10); // moneda contenido
    doc.text(162, 61, oc.info.moneda_nombre);
    doc.rect(160, 65, 40, 10); // banco contenido
    doc.text(162, 71, oc.info.banco_nombre);
    doc.rect(160, 75, 40, 10); // numero de cuenta contenido
    doc.text(162, 81, oc.info.prov_num_cuenta);

    //PROGRAMA Y PO :
    doc.setFontType("bold");
    doc.setDrawColor(0);
    doc.setFillColor(209, 209, 209);
    doc.rect(5, 115, 30, 10, "FD"); //PROGRAMA
    doc.text(7, 121, "PROGRAMA : ");
    doc.setDrawColor(0);
    doc.setFillColor(209, 209, 209);
    doc.rect(5, 125, 30, 10, "FD"); //PO
    doc.text(7, 131, "PO : ");

    doc.setFontType("normal");
    doc.rect(35, 115, 85, 10); //PROGRAMA CONTENIDO
    doc.text(37, 121, oc.info.programa);
    doc.rect(35, 125, 85, 10); //PO CONTENIDO
    doc.text(37, 131, oc.info.po);

    //FECHA ENTREA Y LUGAR DE ENTREGA :
    doc.setFontType("bold");
    doc.setDrawColor(0);
    doc.setFillColor(209, 209, 209);
    doc.rect(120, 115, 40, 10, "FD"); // FECHA DE ENTREGA :
    doc.text(122, 121, "FECHA DE ENTREGA : ");
    doc.setDrawColor(0);
    doc.setFillColor(209, 209, 209);
    doc.rect(120, 125, 40, 10, "FD"); // LUGAR DE ENTREGA :
    doc.text(122, 131, "LUGAR DE ENTREGA : ");

    doc.setFontType("normal");
    doc.rect(160, 115, 40, 10); // FECHA  entrega CONTENIDO :
    doc.text(162, 121, moment(oc.info.fecha_entrega).format("L"));
    doc.rect(160, 125, 40, 10); // LUGAR  entrega CONTENIDO :
    doc.setFontSize(7);
    doc.text(162, 129, "CALLE NUGGET 386,");
    doc.text(162, 133, "AGUSTINO ,LIMA");
    doc.setFontSize(9);

    //TABLA ITEMS
    doc.setFontType("bold");
    doc.setDrawColor(0);
    doc.setFillColor(209, 209, 209);
    doc.rect(5, 145, 22, 10, "FD"); // ITEM :
    doc.text(7, 151, "ITEM : ");
    doc.setDrawColor(0);
    doc.setFillColor(209, 209, 209);
    doc.rect(27, 145, 85, 10, "FD"); // concepto del producto o servicio :
    if (oc.info.tipo_orden == 1) {
      doc.text(29, 151, desc_producto);
    } else {
      doc.text(29, 151, desc_servicio);
    }
    doc.setDrawColor(0);
    doc.setFillColor(209, 209, 209);
    doc.rect(112, 145, 22, 10, "FD"); // CANTIDAD
    doc.setFontSize(7);
    doc.text(114, 151, "CANTIDAD");
    doc.setDrawColor(0);
    doc.setFillColor(209, 209, 209);
    doc.rect(134, 145, 22, 10, "FD"); // UND DE MDE.
    doc.text(136, 151, "UND DE MED. ");
    doc.setDrawColor(0);
    doc.setFillColor(209, 209, 209);
    doc.rect(156, 145, 22, 10, "FD"); // PRECIO UNITARIO
    doc.setFontSize(6);
    doc.text(157, 151, "PRECIO UNITARIO");
    doc.setDrawColor(0);
    doc.setFillColor(209, 209, 209);
    doc.rect(178, 145, 22, 10, "FD"); // PRECIO TOTAL
    doc.text(180, 151, "PRECIO TOTAL");

    let x_item = 5;
    let x_concepto = 27;
    let x_cantidad = 112;
    let x_uni_med = 134;
    let x_precio = 156;
    let x_total = 178;
    let y = 155;
    let y_otro = 20;
    let xx = 22;
    let yy = 10;
    var pageHeight = doc.internal.pageSize.height - 20;
    doc.setFontSize(9);
    doc.setFontType("normal");

    for (let i = 0; i < oc.total_filas; i++) {
      oc.items_data[i].concepto = oc.items_data[i].concepto.toLowerCase();
      //-- minuscula
      if (y <= pageHeight) {
        let concepto_temp = oc.items_data[i].concepto.split(" ");
        let limite_concepto = 55;
        let container_rows_text = [];
        let txt_tmp = '';

        concepto_temp.map((text, i) => {
          if (txt_tmp.length >= limite_concepto) {
            container_rows_text.push(txt_tmp);
            txt_tmp = text + ' ';
          } else {
            if (concepto_temp.length === i + 1) {
              txt_tmp += text;
              container_rows_text.push(txt_tmp);
            } else if (txt_tmp.length + text.length >= limite_concepto) {
              container_rows_text.push(txt_tmp);
              txt_tmp = text + ' ';
            } else {
              txt_tmp += text + ' ';
            }
          }
        });

        if (container_rows_text.length > 1) {
          let total_rows = container_rows_text.length;
          yy = yy * total_rows;

          container_rows_text.map((item, i) => {
            i = i + 1
            doc.text(x_concepto + 2, y + 6 * i, item);
          })
        } else {
          yy = 10;
          doc.text(x_concepto + 2, y + 6, oc.items_data[i].concepto);
        }


        doc.rect(x_item, y, xx, yy); // ITEM CONTENIDO
        doc.text(x_item + 2, y + 6, oc.items_data[i].item);

        doc.rect(x_concepto, y, 85, yy); // concepto del producto o servicio contenido -- 85

        doc.rect(x_cantidad, y, xx, yy); // cantidad contenido
        doc.text(x_cantidad + 2, y + 6, oc.items_data[i].cantidad.toString());
        doc.rect(x_uni_med, y, xx, yy); // uni de med contenido
        doc.text(
          x_uni_med + 2,
          y + 6,
          oc.items_data[i].unidad_medida.toString()
        );
        doc.rect(x_precio, y, xx, yy); // precio unitario contenido
        doc.text(
          x_precio + 2,
          y + 6,
          oc.info.moneda_codigo +
          " " +
          oc.items_data[i].precio_unitario.toString()
        );
        doc.rect(x_total, y, xx, yy); // precio total contenido
        doc.text(
          x_total + 2,
          y + 6,
          oc.info.moneda_codigo +
          " " +
          (
            oc.items_data[i].cantidad * oc.items_data[i].precio_unitario
          ).toString()
        );
        y += yy;

        yy = 10;
      } else if (y >= pageHeight) {
        doc.addPage();
        y = 20;
      }
    }

    if (y <= 140) {
      doc.setDrawColor(0);
      doc.setFillColor(209, 209, 209);
      doc.rect(134, y, 44, 10, "FD"); // SUBTOTAL
      doc.text(136, y + 6, "SUBTOTAL");
      doc.setDrawColor(0);
      doc.setFillColor(209, 209, 209);
      doc.rect(134, y + 10, 44, 10, "FD"); // DESCUENTOS
      doc.text(136, y + 16, "DESCUENTOS");
      doc.setDrawColor(0);
      doc.setFillColor(209, 209, 209);
      doc.rect(134, y + 20, 44, 10, "FD"); // IGV
      doc.text(136, y + 26, "IGV");
      doc.setDrawColor(0);
      doc.setFillColor(209, 209, 209);
      doc.rect(134, y + 30, 44, 10, "FD"); // TOTAL
      doc.text(136, y + 36, "TOTAL");

      doc.setDrawColor(0);
      doc.setFillColor(209, 209, 209);
      doc.rect(178, y, 22, 10, "FD"); // SUBTOTAL contenido
      doc.text(180, y + 6, oc.info.moneda_codigo + " " + oc.total.toString());
      doc.setDrawColor(0);
      doc.setFillColor(209, 209, 209);
      doc.rect(178, y + 10, 22, 10, "FD"); // DESCUENTOS contenido
      doc.text(180, y + 16, oc.info.moneda_codigo + " " + "0");
      this.HelperGenerateIgvTotalPDF(doc, oc, y, oc.info.igv);

      //indicaciones del proveedor
      doc.setFontSize(9);
      doc.text(5, y + 15, "INDICACIONES DEL PROVEEDOR:");
      doc.setFontSize(8);
      doc.text(
        5,
        y + 22,
        "1. El proveedor esta sujeto al horario de recepcion de mercaderia. Horario 9:00 am - 12pm/14:00 -"
      );
      doc.text(5, y + 26, "17:00.");
      doc.text(
        5,
        y + 32,
        "2. Si la mercaderia es incoforme, VIRCATEX no se hara responsable de los pagos adicionales"
      );
      doc.text(5, y + 36, "que conlleva esto.");
      doc.text(
        5,
        y + 42,
        "3. Las facturas deneran ser enviadas al siguiente correo: facturacion@vircatex.com"
      );
      doc.text(
        5,
        y + 48,
        "4. Al momento del despacho el proveedor debe traer consigo una copia de O/C y guias correspondientes."
      );

      doc.setDrawColor(0);
      doc.setFillColor(209, 209, 209);
      doc.rect(5, y + 68, 50, 10, "FD"); // ELABORADO POR
      doc.setDrawColor(0);
      doc.setFillColor(209, 209, 209);
      doc.rect(70, y + 68, 60, 10, "FD"); //  AUTORIZADO POR
      doc.setDrawColor(0);

      doc.setFontSize(9);
      doc.text(7, y + 72, "ELABORADO POR:"); // ELABORADO POR CONTENIDO
      doc.text(7, y + 77, oc.info.usuario_nombre.toUpperCase());
      doc.text(72, y + 74, "AUTORIZADO POR:"); //  AUTORIZADO POR  CONTENIDO

      doc.rect(5, y + 78, 50, 20); // ELABORADO POR CAJITA
      doc.rect(70, y + 78, 60, 20); //  AUTORIZADO POR  CAJITA
    } else if (y <= 220) {
      //subtotal tablita
      doc.setFontType("bold");
      doc.setDrawColor(0);
      doc.setFillColor(209, 209, 209);
      doc.rect(134, y, 44, 10, "FD"); // SUBTOTAL
      doc.text(136, y + 6, "SUBTOTAL");
      doc.setDrawColor(0);
      doc.setFillColor(209, 209, 209);
      doc.rect(134, y + 10, 44, 10, "FD"); // DESCUENTOS
      doc.text(136, y + 16, "DESCUENTOS");
      doc.setDrawColor(0);
      doc.setFillColor(209, 209, 209);
      doc.rect(134, y + 20, 44, 10, "FD"); // IGV
      doc.text(136, y + 26, "IGV");
      doc.setDrawColor(0);
      doc.setFillColor(209, 209, 209);
      doc.rect(134, y + 30, 44, 10, "FD"); // TOTAL
      doc.text(136, y + 36, "TOTAL");

      doc.setFontType("contenido");
      doc.rect(178, y, 22, 10); // SUBTOTAL contenido
      doc.text(180, y + 6, oc.info.moneda_codigo + " " + oc.total.toString());
      doc.rect(178, y + 10, 22, 10); // DESCUENTOS contenido
      doc.text(180, y + 16, oc.info.moneda_codigo + " " + "0");
      this.HelperGenerateIgvTotalPDF(doc, oc, y, oc.info.igv);

      //indicaciones del proveedor
      doc.setFontSize(9);
      doc.setFontType("bold");
      doc.text(5, y + 15, "INDICACIONES DEL PROVEEDOR:");
      doc.setFontType("normal");
      doc.setFontSize(8);
      doc.text(
        5,
        y + 22,
        "1. El proveedor esta sujeto al horario de recepcion de mercaderia. Horario 9:00 am - 12pm/14:00 -"
      );
      doc.text(5, y + 26, "17:00.");
      doc.text(
        5,
        y + 32,
        "2. Si la mercaderia es incoforme, VIRCATEX no se hara responsable de los pagos adicionales"
      );
      doc.text(5, y + 36, "que conlleva esto.");
      doc.text(
        5,
        y + 42,
        "3. Las facturas deneran ser enviadas al siguiente correo: facturacion@vircatex.com"
      );
      doc.text(
        5,
        y + 48,
        "4. Al momento del despacho el proveedor debe traer consigo una copia de O/C y guias correspondientes."
      );

      doc.setDrawColor(0);
      doc.setFillColor(209, 209, 209);
      doc.rect(5, y + 68, 50, 10, "FD"); // ELABORADO POR
      doc.setDrawColor(0);
      doc.setFillColor(209, 209, 209);
      doc.rect(70, y + 68, 60, 10, "FD"); //  AUTORIZADO POR
      doc.setDrawColor(0);

      doc.setFontSize(9);
      doc.text(7, y + 72, "ELABORADO POR:"); // ELABORADO POR CONTENIDO
      doc.text(7, y + 77, oc.info.usuario_nombre.toUpperCase());
      doc.text(72, y + 74, "AUTORIZADO POR:"); //  AUTORIZADO POR  CONTENIDO

      doc.rect(5, y + 78, 50, 20); // ELABORADO POR CAJITA
      doc.rect(70, y + 78, 60, 20); //  AUTORIZADO POR  CAJITA
    } else {
      doc.addPage();
      y = 20;
      doc.setDrawColor(0);
      doc.setFillColor(209, 209, 209);
      doc.rect(134, y, 44, 10, "FD"); // SUBTOTAL
      doc.text(136, y + 6, "SUBTOTAL");
      doc.setDrawColor(0);
      doc.setFillColor(209, 209, 209);
      doc.rect(134, y + 10, 44, 10, "FD"); // DESCUENTOS
      doc.text(136, y + 16, "DESCUENTOS");
      doc.setDrawColor(0);
      doc.setFillColor(209, 209, 209);
      doc.rect(134, y + 20, 44, 10, "FD"); // IGV
      doc.text(136, y + 26, "IGV");
      doc.setDrawColor(0);
      doc.setFillColor(209, 209, 209);
      doc.rect(134, y + 30, 44, 10, "FD"); // TOTAL
      doc.text(136, y + 36, "TOTAL");

      doc.setDrawColor(0);
      doc.setFillColor(209, 209, 209);
      doc.rect(178, y, 22, 10, "FD"); // SUBTOTAL contenido
      doc.text(180, y + 6, oc.info.moneda_codigo + " " + oc.total.toString());
      doc.setDrawColor(0);
      doc.setFillColor(209, 209, 209);
      doc.rect(178, y + 10, 22, 10, "FD"); // DESCUENTOS contenido
      doc.text(180, y + 16, oc.info.moneda_codigo + " " + "0");
      this.HelperGenerateIgvTotalPDF(doc, oc, y, oc.info.igv);

      //indicaciones del proveedor
      doc.setFontSize(9);
      doc.text(5, y + 15, "INDICACIONES DEL PROVEEDOR:");
      doc.setFontSize(8);
      doc.text(
        5,
        y + 22,
        "1. El proveedor esta sujeto al horario de recepcion de mercaderia. Horario 9:00 am - 12pm/14:00 -"
      );
      doc.text(5, y + 26, "17:00.");
      doc.text(
        5,
        y + 32,
        "2. Si la mercaderia es incoforme, VIRCATEX no se hara responsable de los pagos adicionales"
      );
      doc.text(5, y + 36, "que conlleva esto.");
      doc.text(
        5,
        y + 42,
        "3. Las facturas deneran ser enviadas al siguiente correo: facturacion@vircatex.com"
      );
      doc.text(
        5,
        y + 48,
        "4. Al momento del despacho el proveedor debe traer consigo una copia de O/C y guias correspondientes."
      );

      doc.setDrawColor(0);
      doc.setFillColor(209, 209, 209);
      doc.rect(5, y + 68, 50, 10, "FD"); // ELABORADO POR
      doc.setDrawColor(0);
      doc.setFillColor(209, 209, 209);
      doc.rect(70, y + 68, 60, 10, "FD"); //  AUTORIZADO POR
      doc.setDrawColor(0);

      doc.setFontSize(9);
      doc.text(7, y + 72, "ELABORADO POR:"); // ELABORADO POR CONTENIDO
      doc.text(7, y + 77, oc.info.usuario_nombre.toUpperCase());
      doc.text(72, y + 74, "AUTORIZADO POR:"); //  AUTORIZADO POR  CONTENIDO

      doc.rect(5, y + 78, 50, 20); // ELABORADO POR CAJITA
      doc.rect(70, y + 78, 60, 20); //  AUTORIZADO POR  CAJITA
    }

    if (oc.info.tipo_orden == 1) {
      doc.save('OC-' + oc.info.codigo_orden_compras + ".pdf");
    } else {
      doc.save('OS' + oc.info.codigo_orden_compras_servicios + ".pdf");
    }

  }

  HelperGenerateIgvTotalPDF(doc, oc, y, igv) {
    /*if (igv == 0) {
      doc.setDrawColor(0);
      doc.setFillColor(209, 209, 209);
      doc.rect(178, y + 20, 22, 10, "FD"); // TOTAL contenido
      doc.text(
        180,
        y + 26,
        oc.info.moneda_codigo + " " + ((oc.total).toFixed(2)).toString()
      );
    } else {*/
    doc.rect(178, y + 20, 22, 10); // IGV  contenido
    doc.text(
      180,
      y + 26,
      oc.info.moneda_codigo +
      " " +
      Number(oc.igv).toString()
    );
//....................
    let TOTAL_ROW = '';
    if (igv == 0) {
      TOTAL_ROW = ((oc.total).toFixed(2)).toString();
    } else {
      TOTAL_ROW = ((oc.total + Number(oc.igv)).toFixed(2)).toString();
    }
//.................... #ADDED 09032020
    doc.setDrawColor(0);
    doc.setFillColor(209, 209, 209);
    doc.rect(178, y + 30, 22, 10, "FD"); // TOTAL contenido
    doc.text(180, y + 36, oc.info.moneda_codigo + " " + TOTAL_ROW);
    //}
  }
  /*
    HelperTextGenerateIgvTotalPDF(doc, y, igv) {
      if (igv == 0) {
        doc.setDrawColor(0);
        doc.setFillColor(209, 209, 209);
        doc.rect(134, y + 20, 44, 10, "FD"); // TOTAL
        doc.text(136, y + 26, "TOTAL");
      } else {
        doc.setDrawColor(0);
        doc.setFillColor(209, 209, 209);
        doc.rect(134, y + 20, 44, 10, "FD"); // IGV
        doc.text(136, y + 26, "IGV");
        doc.setDrawColor(0);
        doc.setFillColor(209, 209, 209);
        doc.rect(134, y + 30, 44, 10, "FD"); // TOTAL
        doc.text(136, y + 36, "TOTAL");
      }
    }
  */
}
