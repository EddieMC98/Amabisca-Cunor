import { NumberValueAccessor } from "@angular/forms/src/directives";
import { environment } from "../../../../environments/environment";
import { DireccionEnvio } from "../direeccion-envio";
import { InfoPersonal } from "../info-personal";
import { Producto } from "../producto";
import { TipoEnvio } from "../tipoenvio";
import { ProductoAux } from "./producto-aux";

export class ListaCarrito {
  constructor() {
    this.total = 0;
    this.tipoEntrega = new TipoEnvio();
    this.direccionEnvio = new DireccionEnvio();
    this.cliente = new InfoPersonal();
    this.lstProducto = [];
  }
  direccionEnvio: DireccionEnvio;
  lstProducto: ProductoAux[];
  cliente: InfoPersonal;
  tipoEntrega: TipoEnvio;
  total: number;
}
