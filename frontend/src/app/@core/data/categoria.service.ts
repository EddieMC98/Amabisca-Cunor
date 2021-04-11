import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError  } from 'rxjs';
import { APPCONFIG } from '../constantes.module';
import { Categoria } from '../modelos/categoria';

@Injectable()

export class CategoriaService {
  url = APPCONFIG.BASE_URL + "categoria";
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(
    private http: HttpClient
  ) { }


  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.url).pipe(
      catchError(err => this.handleError(err, 'Error al obtener las categorias'))
    )
  }

  findAll(): Observable<Categoria[]>  {
    return this.http.get<Categoria[]>(APPCONFIG.BASE_URL+"categoria");
  }
  // getConfiguracionesPaginado(params: HttpParams): Observable<Paged<Configuracion>> {
  //   return this.http.get<Paged<Configuracion>>(this.url + '/paginado', { params }).pipe(
  //     catchError(err => this.handleError(err, 'Error al obtener las configuraciones'))
  //   )
  // }
  getCategoria(codCategoria: number): Observable<Categoria> {
    return this.http.get<Categoria>(this.url + `/${codCategoria}`).pipe(
      catchError(err => this.handleError(err, 'Error al obtener la categoría.'))
    )
  }
  addCategoria(Categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.url, Categoria, this.httpOptions).pipe(
      catchError(err => this.handleError(err, 'Error al crear la categoria'))
    )
  }
  updateCategoria(Categoria: Categoria): Observable<any> {
    return this.http.put(this.url + `/${Categoria.codCategoria}`, Categoria, this.httpOptions).pipe(
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
