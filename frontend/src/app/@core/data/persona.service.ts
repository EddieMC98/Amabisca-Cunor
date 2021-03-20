import { Injectable } from '@angular/core';
import { APPCONFIG } from '../constantes.module';
import { Persona } from "../modelos/persona";
import { Http, Response } from "@angular/http";
import { Observable } from 'rxjs/Rx';

import { HttpClient } from '@angular/common/http';


@Injectable()
export class PersonaService {
    constructor(private http: HttpClient) {
    }

    findAll(): Observable<Persona[]>  {
    return this.http.get<Persona[]>(APPCONFIG.BASE_URL+"/persona");
    }

    findAllBy(texto:String): Observable<Persona[]>  {
        return this.http.get<Persona[]>(APPCONFIG.BASE_URL+"/persona/busq/"+texto);
        }
    
    findById(id: number): Observable<Persona> {
    return this.http.get<Persona>(APPCONFIG.BASE_URL+"/persona/" + id);
    }
    
    guardar(item: Persona): Observable<Persona> {
    return this.http.post<Persona>(APPCONFIG.BASE_URL+"/persona",item);
    }
    
    eliminarPorId(id: number): Observable<boolean> {
    return this.http.delete<boolean>(APPCONFIG.BASE_URL+"/persona/"+id);
    }
    
    actualizar(item: Persona): Observable<Persona> {
    return this.http.put<Persona>(APPCONFIG.BASE_URL+"/persona",item);
    }
}
