using System;
using System.Collections.Generic;

namespace backend.Models
{
    public partial class TbDivisa
    {
        public int CodDivisa { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public decimal? TipoCambio { get; set; }
        public DateTime? FechaModificacion { get; set; }
    }
}
