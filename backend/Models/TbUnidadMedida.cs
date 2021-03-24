using System;
using System.Collections.Generic;

namespace backend.Models
{
    public partial class TbUnidadMedida
    {
        public TbUnidadMedida()
        {
            TbProducto = new HashSet<TbProducto>();
        }

        public int CodUnidadMedida { get; set; }
        public string NombreUnidadMedida { get; set; }
        public string EstadoActivo { get; set; }

        public virtual ICollection<TbProducto> TbProducto { get; set; }
    }
}
