using System;
using System.Collections.Generic;

namespace amb_002_backend.Models
{
    public partial class TbFactura
    {
        public int CodFactura { get; set; }
        public string NumeroFactura { get; set; }
        public int CodPedido { get; set; }
    }
}
