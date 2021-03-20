using System;
using System.Collections.Generic;

namespace backend.Models
{
    public partial class TbFactura
    {
        public int CodFactura { get; set; }
        public string NumeroFactura { get; set; }
        public int CodPedido { get; set; }

        public virtual TbPedido CodPedidoNavigation { get; set; }
    }
}
