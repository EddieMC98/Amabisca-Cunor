using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class RegisterModel
    {
        public int cod_usuario { get; set; }
        public string nombre_completo { get; set; }
        public string correo_electronico { get; set; }
        public string contrasenia { get; set; }
        public string token { get; set; }
        public int estado { get; set; }
        public int cod_rol { get; set; }
        public DateTime fec_creacion { get; set; }
    }
}