import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { APPCONFIG } from "../constantes.module";
import { ProductoAux } from "../modelos/Varios/producto-aux";

@Injectable({
  providedIn: "root",
})
export class IndexService {
  codProducto: number;
  url = APPCONFIG.BASE_URL + "producto";
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(private http: HttpClient) {}

  verProductos(): Observable<ProductoAux[]> {
    return this.http
      .get<ProductoAux[]>(this.url + "/lstProductoCatalogo")
      .pipe(
        catchError((err) =>
          this.handleError(err, "Error al obtener los productos.")
        )
      );
  }
  verProducto(id: number): Observable<ProductoAux[]> {
    return this.http.get<ProductoAux[]>(
      APPCONFIG.BASE_URL + "producto/lstProductoCatalogo/" + id
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
