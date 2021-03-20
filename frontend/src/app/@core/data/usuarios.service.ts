import { Injectable } from '@angular/core';
import { APPCONFIG } from '../constantes.module';
import { Usuario } from "../modelos/usuario";
import { Http, Response } from "@angular/http";
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class UsuarioService {
    constructor(private http: HttpClient) {
    }

    findAll(): Observable<Usuario[]>  {
        return this.http.get<Usuario[]>(APPCONFIG.BASE_URL+"usuarios");
      }
//ya lo uso editar
      findById(id: number): Observable<Usuario> {
        return this.http.get<Usuario>(APPCONFIG.BASE_URL+"usuarios/" + id);
      }

      guardar(item: Usuario): Observable<Usuario> {
        return this.http.post<any>(APPCONFIG.BASE_URL+"usuarios",item);
      }

      //eliminarPorId(id: number): Observable<boolean> {
        //return this.http.delete<any>(APPCONFIG.BASE_URL+"usuarios/"+id);
      //}
//ya uso otra vez editar, para actualizar
      actualizar(item: Usuario): Observable<Usuario> {
        return this.http.put<any>(APPCONFIG.BASE_URL+"usuarios/"+item.cod_usuario,item);
      }

      deleteUser(id:number){
        return this.http.delete<any>(APPCONFIG.BASE_URL+"usuarios/"+id);
      }
}
