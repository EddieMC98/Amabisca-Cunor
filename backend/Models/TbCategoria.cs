using System;
using System.Collections.Generic;

namespace backend.Models
{
    public partial class TbCategoria
    {
        public TbCategoria()
        {
            TbProducto = new HashSet<TbProducto>();
        }

        public int CodCategoria { get; set; }
        public string NombreCategoria { get; set; }
        public int? EstadoActivo { get; set; }

        public virtual ICollection<TbProducto> TbProducto { get; set; }
    }
}
