import { DetPredonacion } from "./det-predonacion";
import { DonacionMotivo } from "./donacion-motivo";
import { ResPruebaSerologia } from "./res-prueba-serologia";

export class Donacion {
    cod_donacion: number;
    cod_persona_donador: number;
    cod_persona_receptor: number;
    fec_donacion: Date;
    fec_actualizacion: Date;
    barcode: string;
    estado: number;
    cod_tipo_donacion: number;
    no_donacion: string;
    otro_predonacion: string;
    cod_estado: number;
    serologia:number;
    det_prueba_predonacion: DetPredonacion[];
    donacion_motivo: DonacionMotivo[];
    res_prueba_serologia: ResPruebaSerologia[];
}