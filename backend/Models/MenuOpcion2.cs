using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class MenuOpcion2
    {
        public int cod_menu_opcion { get; set; }
        public string nombre { get; set; }
        public int estado { get; set; }
        public int orden { get; set; }
        public int cod_menu { get; set; }
        public string enlace { get; set; }
        public int estado_permiso { get; set; }
        public string nom_menu { get; set; }
        public int cod_rol { get; set; }
    }
}