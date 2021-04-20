import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { APPCONFIG } from '../constantes.module';
import { Pedido } from '../modelos/pedido';
import {PedidoAux} from '../modelos/pedido-aux';
import { DetallePedido } from '../modelos/Varios/PedidosAux';
@Injectable({
  providedIn: "root",
})
export class PedidoService {
  url = APPCONFIG.BASE_URL + "pedido";
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(private http: HttpClient) {}

  addPedido(Pedido: PedidoAux): Observable<any> {
    return this.http
      .post<PedidoAux>(this.url, Pedido, this.httpOptions)
      .pipe(
        catchError((err) => this.handleError(err, "Error al crear el pedido"))
      );
  }
  updatePedido(Pedido: Pedido): Observable<any> {
    return this.http
      .put(this.url + `/${Pedido.codPedido}`, Pedido, this.httpOptions)
      .pipe(
        catchError((err) =>
          this.handleError(err, "Error al actualizar el estado del pedido")
        )
      );
  }

  getPedidos(): Observable<Pedido[]> {
    return this.http
      .get<Pedido[]>(this.url)
      .pipe(
        catchError((err) =>
          this.handleError(err, "Error al obtener los pedidos")
        )
      );
  }
  getPedidosCliente(id: number): Observable<Pedido[]> {
    return this.http
      .get<Pedido[]>(this.url + "/pedidoscliente" + `/${id}`)
      .pipe(
        catchError((err) =>
          this.handleError(err, "Error al obtener los pedidos del cliente")
        )
      );
  }
  getDetallePedido(id: number): Observable<DetallePedido[]> {
    return this.http
      .get<DetallePedido[]>(this.url + "/pedidos" + `/${id}`)
      .pipe(
        catchError((err) =>
          this.handleError(err, "Error al obtener el detalle del pedido")
        )
      );
  }

  private handleError(error: HttpErrorResponse, msj: string) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      if (error.status == 600) {
        msj = error.error;
      }
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError(msj);
  }
}
