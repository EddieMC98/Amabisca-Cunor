using System;
using System.Collections.Generic;

namespace backend.Models
{
    public partial class TbDireccionEnvio
    {
        public TbDireccionEnvio()
        {
            TbClienteDireccionEnvio = new HashSet<TbClienteDireccionEnvio>();
        }

        public int CodDireccionEnvio { get; set; }
        public string Direccion { get; set; }

        public virtual ICollection<TbClienteDireccionEnvio> TbClienteDireccionEnvio { get; set; }
    }
}
