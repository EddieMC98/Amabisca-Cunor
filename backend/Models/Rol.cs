using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    [Table("rol", Schema="public")]
    public class Rol
    {
        [Key]
        public int cod_rol { get; set; }
        public string nombre { get; set; }
        public int estado { get; set; }
    }
}