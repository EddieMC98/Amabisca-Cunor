import { MenuPermiso } from "./menu-permiso";

export class Menu {
    cod_menu: number;
    orden: number;
    nombre: string;
    icono: string;
    enlace: string;
    inicio: number;
    permisos:MenuPermiso[];
}