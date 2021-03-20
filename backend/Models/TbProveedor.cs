using System;
using System.Collections.Generic;

namespace backend.Models
{
    public partial class TbProveedor
    {
        public TbProveedor()
        {
            TbDetalleInventario = new HashSet<TbDetalleInventario>();
        }

        public int CodProveedor { get; set; }
        public string NombreProveedor { get; set; }
        public string ApellidoProveedor { get; set; }
        public string Cui { get; set; }
        public string Nit { get; set; }
        public int? EstadoActivo { get; set; }
        public int CodPais { get; set; }

        public virtual TbPais CodPaisNavigation { get; set; }
        public virtual ICollection<TbDetalleInventario> TbDetalleInventario { get; set; }
    }
}
