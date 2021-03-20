import { Injectable } from '@angular/core';
import { APPCONFIG } from '../constantes.module';
import { SolicitudTransfusion } from "../modelos/solicitud-transfusion";
import { Http, Response } from "@angular/http";
import { Observable } from 'rxjs/Rx';

import { HttpClient } from '@angular/common/http';


@Injectable()
export class SolicitudTransfusionService {
    constructor(private http: HttpClient) {
    }

    findAll(): Observable<SolicitudTransfusion[]>  {
        return this.http.get<SolicitudTransfusion[]>(APPCONFIG.BASE_URL+"/solicitudtransfusion");
      }
     
      findById(id: number): Observable<SolicitudTransfusion> {
        return this.http.get<SolicitudTransfusion>(APPCONFIG.BASE_URL+"/solicitudtransfusion/" + id);
      }
     
      guardar(item: SolicitudTransfusion): Observable<SolicitudTransfusion> {
        return this.http.post<SolicitudTransfusion>(APPCONFIG.BASE_URL+"/solicitudtransfusion",item);
      }
     
      eliminarPorId(id: number): Observable<boolean> {
        return this.http.delete<boolean>(APPCONFIG.BASE_URL+"/solicitudtransfusion/"+id);
      }
     
      actualizar(item: SolicitudTransfusion): Observable<SolicitudTransfusion> {
        return this.http.put<SolicitudTransfusion>(APPCONFIG.BASE_URL+"/solicitudtransfusion",item);
      }
}
