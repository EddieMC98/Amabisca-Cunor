using System;
using System.Collections.Generic;

namespace amb_002_backend.Models
{
    public partial class TbClienteDireccionEnvio
    {
        public int CodClienteDireccionEnvio { get; set; }
        public int CodCliente { get; set; }
        public int CodDireccionEnvio { get; set; }
        public int? EstadoActivo { get; set; }
    }
}
