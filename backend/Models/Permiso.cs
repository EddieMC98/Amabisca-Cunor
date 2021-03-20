using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    [Table("permiso", Schema="public")]
    public class Permiso
    {
        [Key]
        public int cod_permiso { get; set; }
        public DateTime fec_actualizacion { get; set; }
        public DateTime fec_creacion { get; set; }
        public int cod_menu_opcion { get; set; }
        public int cod_rol { get; set; }
        public int estado { get; set; }
    }
}