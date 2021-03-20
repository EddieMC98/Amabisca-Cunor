using System;
using System.Collections.Generic;

namespace backend.Models
{
    public partial class TbMarca
    {
        public TbMarca()
        {
            TbProducto = new HashSet<TbProducto>();
        }

        public int CodMarca { get; set; }
        public string NombreMarca { get; set; }
        public int? EstadoActivo { get; set; }

        public virtual ICollection<TbProducto> TbProducto { get; set; }
    }
}
