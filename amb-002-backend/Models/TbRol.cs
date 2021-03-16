using System;
using System.Collections.Generic;

namespace amb_002_backend.Models
{
    public partial class TbRol
    {
        public int CodRol { get; set; }
        public string Rol { get; set; }
        public int? EstadoActivo { get; set; }
    }
}
