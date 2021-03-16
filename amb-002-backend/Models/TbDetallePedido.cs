using System;
using System.Collections.Generic;

namespace amb_002_backend.Models
{
    public partial class TbDetallePedido
    {
        public int CodDetallePedido { get; set; }
        public int CodPedido { get; set; }
        public int? Cantidad { get; set; }
        public int CodProducto { get; set; }
    }
}
