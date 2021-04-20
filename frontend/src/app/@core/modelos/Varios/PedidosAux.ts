export class DetallePedido {
  
  constructor() {
      this.codPedido=0;
      this.fechaPedido=new Date();
      this.numeroPedido='';
      this.montoTotal=0;
      this.estadoEntrega='';
      this.cliente='';
      this.clienteDireccionEnvio='';
      this.tipoEnvio='';
      this.nProducto='';
      this.cantidad=0;
      this.precioVenta=0;
      this.marca='';
      this.categoria='';
      this.nombrePersona='';
      this.transaccionID='';
      this.costoEnvio=0;

  }

  codPedido: number;
  fechaPedido: Date;
  numeroPedido: string;
  montoTotal: number;
  estadoEntrega: string;
  cliente: string;
  clienteDireccionEnvio: string;
  tipoEnvio: string;
  nProducto: string;
  cantidad: number;
  precioVenta: number;
  marca: string;
  categoria: string;
  nombrePersona: string;
  transaccionID: string;
  costoEnvio: number;
}