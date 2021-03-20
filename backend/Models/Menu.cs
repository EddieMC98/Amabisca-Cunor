using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    [Table("menu", Schema="public")]
    public class Menu
    {
        [Key]
        public int cod_menu { get; set; }
        public string enlace { get; set; }
        public string icono { get; set; }
        public int inicio { get; set; }
        public string nombre { get; set; }
        public int orden { get; set; }
        public int estado { get; set; }
    }
}