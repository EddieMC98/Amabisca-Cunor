using System;
using System.Collections.Generic;

namespace amb_002_backend.Models
{
    public partial class TbCliente
    {
        public int CodCliente { get; set; }
        public int? EstadoActivo { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public int CodInformacionPersonal { get; set; }
        public int CodUsuario { get; set; }
    }
}
