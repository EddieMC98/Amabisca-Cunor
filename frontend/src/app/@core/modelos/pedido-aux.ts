
import { ProductoAux } from "./Varios/producto-aux";


export class PedidoAux {
  constructor() {
    this.codPedido=0;
    this.estadoEntrega="ACEPTADO";
    this.fechaPedido=new Date();
    this.numeroPedido="";
    this.montoTotal=0;
    this.codCliente=0;
    this.codClienteDireccionEnvio=0;
    this.codTipoEnvio=0;
    this.lstProductos=[];
  }

  codPedido:number;
  estadoEntrega:string;
  fechaPedido:Date;
  numeroPedido:string;
  montoTotal:number;
  codCliente:number;
  codClienteDireccionEnvio:number;
  codTipoEnvio:number;
  lstProductos: ProductoAux[];

}
