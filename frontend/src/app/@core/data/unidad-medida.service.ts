import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError  } from 'rxjs';
import { APPCONFIG } from '../constantes.module';
import { UnidadMedida } from '../modelos/unidad-medida';

@Injectable()

export class UnidadMedidaService {
  url = APPCONFIG.BASE_URL + "unidadmedida";
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(
    private http: HttpClient
  ) { }


  getUnidades(): Observable<UnidadMedida[]> {
    return this.http.get<UnidadMedida[]>(this.url).pipe(
      catchError(err => this.handleError(err, 'Error al obtener las unidades de medida'))
    )
  }
  // getConfiguracionesPaginado(params: HttpParams): Observable<Paged<Configuracion>> {
  //   return this.http.get<Paged<Configuracion>>(this.url + '/paginado', { params }).pipe(
  //     catchError(err => this.handleError(err, 'Error al obtener las configuraciones'))
  //   )
  // }
  getUnidad(codUnidadMedida: number): Observable<UnidadMedida> {
    return this.http.get<UnidadMedida>(this.url + `/${codUnidadMedida}`).pipe(
      catchError(err => this.handleError(err, 'Error al obtener la unidad de medida.'))
    )
  }
  addUnidad(UnidadMedida: UnidadMedida): Observable<UnidadMedida> {
    return this.http.post<UnidadMedida>(this.url, UnidadMedida, this.httpOptions).pipe(
      catchError(err => this.handleError(err, 'Error al crear la unidad de medida'))
    )
  }
  updateUnidad(UnidadMedida: UnidadMedida): Observable<any> {
    return this.http.put(this.url + `/${UnidadMedida.codUnidadMedida}`, UnidadMedida, this.httpOptions).pipe(
      catchError(err => this.handleError(err, 'Error al actualizar la categoría'))
    )
  }

  private handleError(error: HttpErrorResponse, msj: string) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      if (error.status == 600) {
        msj = error.error
      }
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(msj);
  };


}
