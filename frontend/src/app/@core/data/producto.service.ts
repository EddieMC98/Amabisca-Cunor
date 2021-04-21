import { Producto } from "../modelos/producto";
import { Injectable } from "@angular/core";
import { APPCONFIG } from "../constantes.module";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { ProductoAux } from "../modelos/Varios/producto-aux";

@Injectable({
  providedIn: "root",
})
export class ProductoService {
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(private http: HttpClient) {}

  findAll(): Observable<Producto[]> {
    return this.http.get<Producto[]>(APPCONFIG.BASE_URL + "producto");
  }

  findById(id: number): Observable<Producto> {
    return this.http.get<Producto>(APPCONFIG.BASE_URL + "producto/" + id);
  }

  guardar(item: Producto): Observable<Producto> {
    return this.http.post<any>(APPCONFIG.BASE_URL + "producto", item);
  }

  eliminarPorId(id: number): Observable<boolean> {
    return this.http.delete<any>(APPCONFIG.BASE_URL + "producto/" + id);
  }

  actualizar(item: Producto): Observable<Producto> {
    return this.http.put<any>(
      APPCONFIG.BASE_URL + "producto/" + item.codProducto,
      item
    );
  }

  verProductos(): Observable<ProductoAux[]> {
    return this.http.get<ProductoAux[]>(
      APPCONFIG.BASE_URL + "producto/lstProducto"
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

  //Mètodos video nuevo èèèè
  uploadFile(File): Observable<any> {
    var peticion = "producto/Subir/";
    var json = JSON.stringify(File);
    console.log(File);
    var headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(APPCONFIG.BASE_URL + peticion, File, { headers });
  }

  getUploads(): Observable<any> {
    var peticion = "producto/ImagenesSubidas";
    return this.http.get(APPCONFIG.BASE_URL + peticion);
  }
}
