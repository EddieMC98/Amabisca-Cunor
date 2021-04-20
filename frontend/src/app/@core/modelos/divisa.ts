export class Divisa {
  constructor() {
   this.codDivisa=0;
   this.tipoCambio=0;
   this.fechaCreacion=new Date();
   this.fechaModificacion = new Date();
  }

  codDivisa: number;
  tipoCambio: number;
  fechaCreacion:Date;
  fechaModificacion:Date;
}
