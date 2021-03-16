using System;
using System.Collections.Generic;

namespace amb_002_backend.Models
{
    public partial class TbEmpleado
    {
        public int CodEmpleado { get; set; }
        public string CodigoEmpleado { get; set; }
        public int? EstadoActivo { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public int CodUsuario { get; set; }
        public int CodInformacionPersonal { get; set; }
    }
}
