using System;
using System.Collections.Generic;

namespace amb_002_backend.Models
{
    public partial class TbInventario
    {
        public int CodInventario { get; set; }
        public string NombreInventario { get; set; }
        public int? EstadoActivo { get; set; }
    }
}
