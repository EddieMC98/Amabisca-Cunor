import { Injectable } from '@angular/core';
import { APPCONFIG } from '../constantes.module';
import { Menu } from "../modelos/menu";
import { Http, Response } from "@angular/http";
import { Observable } from 'rxjs/Rx';

import { MenuPermiso } from '../modelos/menu-permiso';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class MenuService {
    constructor(private http: HttpClient) {
    }

    findAll(): Observable<Menu[]>  {
        return this.http.get<Menu[]>(APPCONFIG.BASE_URL+"/auth/menu");
    }

    findPermisos(codMenu: number, codRol: number): Observable<MenuPermiso[]>  {
        return this.http.get<MenuPermiso[]>(APPCONFIG.BASE_URL+"usuarios/menu/permisos/"+codRol);
    }

    guardar(items: MenuPermiso[]): Observable<MenuPermiso[]> {
        return this.http.post<MenuPermiso[]>(APPCONFIG.BASE_URL+"usuarios/menu/permisos",items);
    }
}