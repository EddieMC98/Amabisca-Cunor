using System;
using System.Collections.Generic;

namespace backend.Models
{
    public partial class TbCliente
    {
        public TbCliente()
        {
            TbClienteDireccionEnvio = new HashSet<TbClienteDireccionEnvio>();
            TbPedido = new HashSet<TbPedido>();
        }

        public int CodCliente { get; set; }
        public int? EstadoActivo { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public int CodInformacionPersonal { get; set; }
        public int CodUsuario { get; set; }

        public virtual TbInformacionPersonal CodInformacionPersonalNavigation { get; set; }
        //public virtual Usuario CodUsuarioNavigation { get; set; }
        public virtual ICollection<TbClienteDireccionEnvio> TbClienteDireccionEnvio { get; set; }
        public virtual ICollection<TbPedido> TbPedido { get; set; }
    }
}
