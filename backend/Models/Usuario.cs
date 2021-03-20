using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    [Table("usuario", Schema="public")]
    public class Usuario
    {
        [Key]
        public int cod_usuario { get; set; }
        public string nombre_completo { get; set; }
        public string correo_electronico { get; set; }
        public byte[] contrasenia { get; set; }
        public byte[] salt { get; set; }
        public string token { get; set; }
        public int estado { get; set; }
        public int cod_rol { get; set; }
        
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
        public DateTime fec_creacion { get; set; }
    }
}