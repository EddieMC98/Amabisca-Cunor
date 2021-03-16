using System;
using System.Collections.Generic;

namespace amb_002_backend.Models
{
    public partial class TbMenuOpcion
    {
        public int CodMenuOpcion { get; set; }
        public string Enlace { get; set; }
        public int? EstadoActivo { get; set; }
        public string NombreMenuOpcion { get; set; }
        public int? Orden { get; set; }
        public int CodMenu { get; set; }
    }
}
