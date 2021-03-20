using System;
using System.Collections.Generic;

namespace backend.Models
{
    public partial class TbPedido
    {
        public TbPedido()
        {
            TbDetallePedido = new HashSet<TbDetallePedido>();
            TbFactura = new HashSet<TbFactura>();
        }

        public int CodPedido { get; set; }
        public DateTime? FechaPedido { get; set; }
        public decimal? MontoTotal { get; set; }
        public string NumeroPedido { get; set; }
        public string EstadoEntrega { get; set; }
        public int CodCliente { get; set; }
        public int CodClienteDireccionEnvio { get; set; }
        public int CodTipoEnvio { get; set; }

        public virtual TbClienteDireccionEnvio CodClienteDireccionEnvioNavigation { get; set; }
        public virtual TbCliente CodClienteNavigation { get; set; }
        public virtual TbTipoEnvio CodTipoEnvioNavigation { get; set; }
        public virtual ICollection<TbDetallePedido> TbDetallePedido { get; set; }
        public virtual ICollection<TbFactura> TbFactura { get; set; }
    }
}
