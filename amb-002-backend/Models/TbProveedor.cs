using System;
using System.Collections.Generic;

namespace amb_002_backend.Models
{
    public partial class TbProveedor
    {
        public int CodProveedor { get; set; }
        public string NombreProveedor { get; set; }
        public string ApellidoProveedor { get; set; }
        public string Cui { get; set; }
        public string Nit { get; set; }
        public int? EstadoActivo { get; set; }
        public int CodPais { get; set; }
    }
}
