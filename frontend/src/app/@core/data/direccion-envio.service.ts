import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { APPCONFIG } from "../constantes.module";
import { DireccionEnvio } from "../modelos/direeccion-envio";
import { DireccionClienteEnvio } from "../modelos/direccion-cliente-envio";
import { Cliente } from "../modelos/cliente";
import { TipoEnvio } from "../modelos/tipoenvio";

@Injectable({
  providedIn: "root",
})
export class DireccionEnvioService {
  url = APPCONFIG.BASE_URL + "direccionenvio";
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(private http: HttpClient) {}
  getDirecciones(codCliente: number): Observable<DireccionEnvio[]> {
    return this.http
      .get<any>(this.url + "/direcciones-cliente" + `/${codCliente}`)
      .pipe(
        catchError((err) =>
          this.handleError(err, "Error al obtener las direcciones de envío")
        )
      );
  }
  getDireccion(codDireccionEnvio: number): Observable<DireccionEnvio[]> {
    return this.http
      .get<any>(this.url + `/${codDireccionEnvio}`)
      .pipe(
        catchError((err) =>
          this.handleError(err, "Error al obtener la dirección de envío")
        )
      );
  }

  addDireccionEnvio(
    DireccionEnvio: DireccionEnvio
  ): Observable<DireccionEnvio> {
    return this.http
      .post<DireccionEnvio>(this.url, DireccionEnvio, this.httpOptions)
      .pipe(
        catchError((err) =>
          this.handleError(err, "Error al obtener la Dirección de envío.")
        )
      );
  }

  addClienteDireccionEnvio(
    DireccionClienteEnvio: DireccionClienteEnvio
  ): Observable<DireccionClienteEnvio> {
    return this.http
      .post<DireccionClienteEnvio>(
        this.url + "/direccion-cliente",
        DireccionClienteEnvio,
        this.httpOptions
      )
      .pipe(
        catchError((err) => this.handleError(err, "Error al crear el cliente."))
      );
  }
  updateDireccionEnvio(DireccionEnvio: DireccionEnvio): Observable<any> {
    return this.http
      .put(
        this.url + `/${DireccionEnvio.codDireccionEnvio}`,
        DireccionEnvio,
        this.httpOptions
      )
      .pipe(
        catchError((err) =>
          this.handleError(err, "Error al actualizar la Dirección de Envío")
        )
      );
  }

  //Obtener empresas de TRansporte
  getEmpresasTransporte(): Observable<TipoEnvio[]> {
    return this.http.get<TipoEnvio[]>(APPCONFIG.BASE_URL + "TipoEnvio");
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

  getClienteDireccion(
    codDireccionEnvio: number,
    codCliente: number
  ): Observable<DireccionClienteEnvio[]> {
    return this.http
      .get<any>(
        this.url +
          "/direccionCliente" +
          `/${codCliente}` +
          `/${codDireccionEnvio}`
      )
      .pipe(
        catchError((err) =>
          this.handleError(err, "Error al obtener la dirección de envío")
        )
      );
  }
}
