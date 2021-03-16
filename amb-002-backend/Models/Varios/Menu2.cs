using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace amb_002_backend.Models
{
    public class Menu2
    {
        public int cod_menu { get; set; }
        public string enlace { get; set; }
        public string icono { get; set; }
        public int inicio { get; set; }
        public string nombre { get; set; }
        public int orden { get; set; }
        public int estado { get; set; }
        public List<TbMenuOpcion> permisos { get; set; }
    }
}