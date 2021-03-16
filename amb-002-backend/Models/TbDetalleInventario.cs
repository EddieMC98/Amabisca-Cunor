using System;
using System.Collections.Generic;

namespace amb_002_backend.Models
{
    public partial class TbDetalleInventario
    {
        public int CodDetalleInventario { get; set; }
        public int? Stock { get; set; }
        public int CodInventario { get; set; }
        public int CodProveedor { get; set; }
        public int CodProducto { get; set; }
    }
}
