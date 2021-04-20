export class Transaccion {
  constructor() {
    this.codTransaccion=0;
    this.transaccionId='';
    this.codPedido=0;
    this.fechaCreacion = new Date();
    
  }

  codTransaccion: number;
  transaccionId: string;
  codPedido: number;
  fechaCreacion: Date;
}
