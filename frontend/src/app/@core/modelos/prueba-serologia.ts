import { DetPruebaSerologia } from "./det-prueba-serologia";

export class PruebaSerologia {
    cod_prueba: number;
    fec_creacion: Date;
    cod_servicio: number;
    estado: number;
    det_prueba_serologia: DetPruebaSerologia[];
}