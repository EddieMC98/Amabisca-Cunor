using System;
using System.Collections.Generic;

namespace backend.Models
{
    public partial class TbTipoEnvio
    {
        public TbTipoEnvio()
        {
            TbPedido = new HashSet<TbPedido>();
        }

        public int CodTipoEnvio { get; set; }
        public string NombreTipoEnvio { get; set; }
        public decimal? CostoEnvio { get; set; }

        public virtual ICollection<TbPedido> TbPedido { get; set; }
    }
}
