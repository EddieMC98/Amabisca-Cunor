import { Injectable } from '@angular/core';
import { APPCONFIG } from '../constantes.module';
import { Rol } from "../modelos/rol";
import { Http, Response } from "@angular/http";
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class RolService {
    constructor(private http: HttpClient) {
    }

    findAll(): Observable<Rol[]>  {
        return this.http.get<Rol[]>(APPCONFIG.BASE_URL+"roles");
      }
     
      findById(id: number): Observable<Rol> {
        return this.http.get<Rol>(APPCONFIG.BASE_URL+"roles/" + id);
      }
     
      guardar(item: Rol): Observable<Rol> {
        return this.http.post<Rol>(APPCONFIG.BASE_URL+"roles",item);
      }
     
      eliminarPorId(id: number): Observable<boolean> {
        return this.http.delete<boolean>(APPCONFIG.BASE_URL+"roles/"+id);
      }
     
      actualizar(item: Rol): Observable<Rol> {
        return this.http.put<Rol>(APPCONFIG.BASE_URL+"roles/"+item.cod_rol,item);
      }
}
