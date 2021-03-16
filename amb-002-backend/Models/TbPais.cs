using System;
using System.Collections.Generic;

namespace amb_002_backend.Models
{
    public partial class TbPais
    {
        public int CodPais { get; set; }
        public string NomPais { get; set; }
        public string Acronimo { get; set; }
        public int? EstadoActivo { get; set; }
    }
}
