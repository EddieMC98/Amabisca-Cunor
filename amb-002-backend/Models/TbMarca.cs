using System;
using System.Collections.Generic;

namespace amb_002_backend.Models
{
    public partial class TbMarca
    {
        public int CodMarca { get; set; }
        public string NombreMarca { get; set; }
        public int? EstadoActivo { get; set; }
    }
}
