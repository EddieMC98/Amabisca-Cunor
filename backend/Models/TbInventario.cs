using System;
using System.Collections.Generic;

namespace backend.Models
{
    public partial class TbInventario
    {
        public TbInventario()
        {
            TbDetalleInventario = new HashSet<TbDetalleInventario>();
        }

        public int CodInventario { get; set; }
        public string NombreInventario { get; set; }
        public int? EstadoActivo { get; set; }

        public virtual ICollection<TbDetalleInventario> TbDetalleInventario { get; set; }
    }
}
