using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    [Table("menu_opcion", Schema="public")]
    public class MenuOpcion
    {
        [Key]
        public int cod_menu_opcion { get; set; }
        public string enlace { get; set; }
        public int estado { get; set; }
        public string nombre { get; set; }
        public int orden { get; set; }
        public int cod_menu { get; set; }
    }
}