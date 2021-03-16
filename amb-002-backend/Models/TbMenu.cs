using System;
using System.Collections.Generic;

namespace amb_002_backend.Models
{
    public partial class TbMenu
    {
        public int CodMenu { get; set; }
        public string Enlace { get; set; }
        public string Icono { get; set; }
        public int? Inicio { get; set; }
        public string Nombre { get; set; }
        public int? Orden { get; set; }
        public int? EstadoActivo { get; set; }
    }
}
