using System;
using System.Collections.Generic;

namespace backend.Models
{
    public partial class TbClienteDireccionEnvio
    {
        public TbClienteDireccionEnvio()
        {
            TbPedido = new HashSet<TbPedido>();
        }

        public int CodClienteDireccionEnvio { get; set; }
        public int CodCliente { get; set; }
        public int CodDireccionEnvio { get; set; }
        public int? EstadoActivo { get; set; }

        public virtual TbCliente CodClienteNavigation { get; set; }
        public virtual TbDireccionEnvio CodDireccionEnvioNavigation { get; set; }
        public virtual ICollection<TbPedido> TbPedido { get; set; }
    }
}
