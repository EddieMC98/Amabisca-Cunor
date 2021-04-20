export class Pedido {
  constructor() {
      this.codPedido = 0;
      this.fechaPedido=new Date();
      this.montoTotal=0;
      this.numeroPedido='';
      this.estadoEntrega='';
      this.codCliente=0;
      this.codClienteDireccionEnvio=0;
      this.codTipoEnvio=0;
  }
  

  
  codPedido: number;
  fechaPedido: Date;
  montoTotal: number;
  numeroPedido: string;
  estadoEntrega: string;
  codCliente: number;
  codClienteDireccionEnvio: number;
  codTipoEnvio: number;

}