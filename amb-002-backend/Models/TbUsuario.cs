using System;
using System.Collections.Generic;

namespace amb_002_backend.Models
{
    public partial class TbUsuario
    {
        public int CodUsuario { get; set; }
        public string NombreUsuario { get; set; }
        public byte[] Contraseña { get; set; }
        public string CorreoElectronico { get; set; }
        public int? EstadoActivo { get; set; }
        public string Token { get; set; }
        public byte[] Salt { get; set; }
        public DateTime? FecCreacion { get; set; }
        public int CodRol { get; set; }
    }
}
