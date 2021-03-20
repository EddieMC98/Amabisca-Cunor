using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using NodaTime;

namespace backend.Models
{
    public class IngresoModel
    {
        public int cod_registro_ingreso { get; set; }
        public int cod_cliente { get; set; }
        public DateTime fec_registro { get; set; }
        public string  hora_entrada { get; set; }
        public decimal entra { get; set; }
        public string  hora_salida { get; set; }
        public decimal sale { get; set; }
        public decimal neto { get; set; }
        public decimal precio { get; set; }
        public decimal cantidad { get; set; }
        public int cod_area { get; set; }
        public int estado { get; set; }
        public int cod_usuario { get; set; }
        public string area {get;set;}
        public string cliente {get;set;}
    }
}