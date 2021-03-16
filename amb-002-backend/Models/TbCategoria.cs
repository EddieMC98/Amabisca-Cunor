using System;
using System.Collections.Generic;

namespace amb_002_backend.Models
{
    public partial class TbCategoria
    {
        public int CodCategoria { get; set; }
        public string NombreCategoria { get; set; }
        public int? EstadoActivo { get; set; }
    }
}
