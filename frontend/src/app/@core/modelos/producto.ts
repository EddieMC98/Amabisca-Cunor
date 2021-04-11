import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";

export class Producto {
  constructor(){
    this.codProducto=0;
    this.nombreProducto='';
    this.codigoProducto='';
    this.estadoActivo=1;
    this.precioCosto=0.00;
    this.precioVenta=0.00;
    this.imagenProducto='';
    this.detalleProducto='';
    this.fechaCreacion=new Date();
    this.fechaModificacion=new Date();
    this.codCategoria=1;
    this.codMarca=1;
    this.codUnidadMedida=1;
  }
  codProducto: number;
  nombreProducto: string;
  codigoProducto: string;
  estadoActivo: number;
  precioCosto: number;
  precioVenta: number;
  imagenProducto: string;
  detalleProducto : string;
  fechaCreacion : Date;
  fechaModificacion : Date;
  usrModificacion : number;
  codCategoria : number;
  codMarca: number
  codUnidadMedida: number;
}
