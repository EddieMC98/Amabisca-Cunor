using System;
using System.Collections.Generic;

namespace amb_002_backend.Models
{
    public partial class TbTipoEnvio
    {
        public int CodTipoEnvio { get; set; }
        public string NombreTipoEnvio { get; set; }
        public decimal? CostoEnvio { get; set; }
    }
}
