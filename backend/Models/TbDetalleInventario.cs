using System;
using System.Collections.Generic;

namespace backend.Models
{
    public partial class TbDetalleInventario
    {
        public int CodDetalleInventario { get; set; }
        public int? Stock { get; set; }
        public int CodInventario { get; set; }
        public int CodProveedor { get; set; }
        public int CodProducto { get; set; }

        public virtual TbInventario CodInventarioNavigation { get; set; }
        public virtual TbProducto CodProductoNavigation { get; set; }
        public virtual TbProveedor CodProveedorNavigation { get; set; }
    }
}
