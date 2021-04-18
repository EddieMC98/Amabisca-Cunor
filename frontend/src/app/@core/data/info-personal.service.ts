import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs-compat';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/operators';
import { APPCONFIG } from '../constantes.module';
import { InfoPersonal } from '../modelos/info-personal';
import { Cliente } from "../modelos/cliente";

@Injectable({
  providedIn: "root",
})
export class InfoPersonalService {
  url = APPCONFIG.BASE_URL + "InformacionPersonal";
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };
  constructor(private http: HttpClient) {}

  getInfo(codInfo: number): Observable<InfoPersonal> {
    return this.http
      .get<any>(this.url + "/cliente" + `/${codInfo}`)
      .pipe(
        catchError((err) =>
          this.handleError(err, "Error al obtener la Información Personal.")
        )
      );
  }
  //cliente-aux/{id}
  getCliente(codUsuario: number): Observable<Cliente> {
    return this.http
      .get<any>(this.url + "/cliente-aux" + `/${codUsuario}`)
      .pipe(
        catchError((err) =>
          this.handleError(err, "Error al obtener el cliente")
        )
      );
  }

  addInfoPersonal(InfoPersonal: InfoPersonal): Observable<InfoPersonal> {
    return this.http
      .post<InfoPersonal>(this.url, InfoPersonal, this.httpOptions)
      .pipe(
        catchError((err) =>
          this.handleError(err, "Error al obtener la Información Personal.")
        )
      );
  }
  addCliente(Cliente: Cliente): Observable<Cliente> {
    return this.http
      .post<Cliente>(this.url + "/cliente", Cliente, this.httpOptions)
      .pipe(
        catchError((err) => this.handleError(err, "Error al crear el cliente."))
      );
  }

  updateInfoPersonal(InfoPersonal: InfoPersonal): Observable<any> {
    return this.http
      .put(
        this.url + `/${InfoPersonal.codInformacionPersonal}`,
        InfoPersonal,
        this.httpOptions
      )
      .pipe(
        catchError((err) =>
          this.handleError(err, "Error al actualizar la Información Personal")
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
