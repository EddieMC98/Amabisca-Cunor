using System;
using System.Collections.Generic;

namespace amb_002_backend.Models
{
    public partial class TbPermiso
    {
        public int CodPermiso { get; set; }
        public DateTime? FecActualizacion { get; set; }
        public DateTime? FechCreacion { get; set; }
        public int? EstadoActivo { get; set; }
        public int CodMenuOpcion { get; set; }
        public int CodRol { get; set; }
    }
}
